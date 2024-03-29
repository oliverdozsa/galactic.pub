import {
  Asset,
  BASE_FEE,
  Keypair,
  Memo,
  Networks,
  TransactionBuilder
} from "@stellar/stellar-sdk";
import {from, map, Observable, switchMap} from "rxjs";
import {CastVoteTransactionData} from "./cast-vote-operations";
import {AppKeyPair} from "../../../../create-voting/account/app-key-pair";
import {StellarServers} from "../../../../blockchains/StellarServers";
import {Voting} from "../../../../data/voting";
import {AccountResponse, HorizonApi} from "@stellar/stellar-sdk/lib/horizon";
import SubmitTransactionResponse = HorizonApi.SubmitTransactionResponse;
import {Operation} from "@stellar/stellar-base";

export class CastVoteStellarOperations {
  static createAccount(): AppKeyPair {
    const keyPair = Keypair.random();

    return {
      publicKey: keyPair.publicKey(),
      secretKey: keyPair.secret()
    }
  }

  static submitAccountCreationTransaction(transaction: string, voterAccount: AppKeyPair, isOnTestNetwork: boolean): Observable<any> {
    const passPhrase = isOnTestNetwork ? Networks.TESTNET : Networks.PUBLIC;
    const stellarTx = TransactionBuilder.fromXDR(transaction, passPhrase);
    const stellarKeypair: Keypair = Keypair.fromSecret(voterAccount.secretKey);

    stellarTx.sign(stellarKeypair);

    const server = StellarServers.getServer(isOnTestNetwork);
    return from(server.submitTransaction(stellarTx));
  }

  static executeCastVoteTransaction(txData: CastVoteTransactionData): Observable<string> {
    const server = StellarServers.getServer(txData.voting.isOnTestNetwork);
    return from(server.loadAccount(txData.voterAccountKeyPair.publicKey))
      .pipe(
        switchMap(r => CastVoteStellarOperations.executeCastVote_OnAccountLoaded(r, txData.voterAccountKeyPair, txData.voting, txData.choices)),
        map(r => r.hash)
      );
  }

  private static executeCastVote_OnAccountLoaded(voterAccount: AccountResponse, voterKeyPair: AppKeyPair, voting: Voting, choices: string[]):
    Observable<SubmitTransactionResponse> {
    const choicesMemo = choices.join("");
    const voteToken = new Asset(voting.assetCode, voting.issuerAccountId);

    const transaction = new TransactionBuilder(voterAccount, {
      fee: BASE_FEE,
      networkPassphrase: voting.isOnTestNetwork ? Networks.TESTNET : Networks.PUBLIC,
      memo: Memo.text(choicesMemo)
    })
      .addOperation(
        Operation.payment({
          destination: voting.ballotAccountId!,
          asset: voteToken,
          amount: `${1 / 10 ** 7}`
        })
      )
      .addOperation(
        Operation.changeTrust({
          asset: voteToken,
          limit: "0"
        })
      )
      .addOperation(
        Operation.accountMerge({
          destination: voting.distributionAccountId!
        })
      )
      .setTimeout(30)
      .build();

    const voterStellarKeyPair = Keypair.fromSecret(voterKeyPair.secretKey);
    transaction.sign(voterStellarKeyPair);

    const server = StellarServers.getServer(voting.isOnTestNetwork);
    return from(server.submitTransaction(transaction));
  }
}

import {KeyPair} from "../../../components/create-voting/account/key-pair";
import {
  AccountResponse,
  Asset,
  BASE_FEE,
  Horizon,
  Keypair,
  Memo,
  Networks,
  Operation,
  TransactionBuilder
} from "stellar-sdk";
import {from, map, Observable, switchMap} from "rxjs";
import {StellarServers} from "../../../blockchains/StellarServers";
import {Voting} from "../../../services/voting";
import SubmitTransactionResponse = Horizon.SubmitTransactionResponse;
import {CastVoteTransactionData} from "./cast-vote-operations";

export class CastVoteStellarOperations {
  static createAccount(): KeyPair {
    const keyPair = Keypair.random();

    return {
      publicKey: keyPair.publicKey(),
      secretKey: keyPair.secret()
    }
  }

  static submitAccountCreationTransaction(transaction: string, voterAccount: KeyPair, isOnTestNetwork: boolean): Observable<any> {
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

  private static executeCastVote_OnAccountLoaded(voterAccount: AccountResponse, voterKeyPair: KeyPair, voting: Voting, choices: string[]):
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

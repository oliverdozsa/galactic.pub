import {forkJoin, map, Observable, switchMap, throwError} from "rxjs";
import {CastVoteStellarOperations} from "./cast-vote-stellar-operations";
import {AppKeyPair} from "../../../../create-voting/account/app-key-pair";
import {Voting} from "../../../../data/voting";
import {CastVoteService, EncryptedChoiceResponse} from "../../../../services/cast-vote.service";
import {BallotType} from "../../../../create-voting/ballot-type";

export class CastVoteOperations {
  constructor(private voting: Voting, private castVoteService: CastVoteService) {
  }

  createAccount(): AppKeyPair {
    if (this.voting.network == "stellar") {
      return CastVoteStellarOperations.createAccount();
    }

    return {
      publicKey: "<NOT SET>",
      secretKey: "<NOT SET>"
    }
  }

  submitAccountCreationTransaction(transaction: string, voterAccount: AppKeyPair): Observable<any> {
    if (this.voting.network == "stellar") {
      return CastVoteStellarOperations.submitAccountCreationTransaction(transaction, voterAccount, this.voting.isOnTestNetwork);
    }

    return throwError(() => "");
  }

  castVote(voterAccount: AppKeyPair, choices: any[]): Observable<string> {
    let encodedChoices: string[] = [];

    if (this.voting.ballotType == BallotType.MULTI_POLL) {
      encodedChoices = choices
        .map((c, i) => this.encodePollChoice(i, c))
        .filter(e => e != undefined) as string[];
    } else if (this.voting.ballotType == BallotType.MULTI_CHOICE) {
      encodedChoices = choices.map((c, i) => {
        if (c == true) {
          return this.encodePollChoice(1, i)
        }

        return "";
      }) as string[];
    }

    if (this.voting.encryptedUntil != undefined) {
      const encryptedChoices$: Observable<EncryptedChoiceResponse>[] = encodedChoices
        .map(c => this.castVoteService.getEncryptedChoice(this.voting.id, c));

      return forkJoin(encryptedChoices$)
        .pipe(
          map(encryptedChoiceResponses => encryptedChoiceResponses.map(r => r.result)),
          switchMap(encryptedChoices => this.executeCastVoteTransaction(voterAccount, encryptedChoices))
        );
    } else {
      return this.executeCastVoteTransaction(voterAccount, encodedChoices);
    }
  }

  private encodePollChoice(pollIndex: number, optionCode: number|undefined): string|undefined {
    if(optionCode == undefined) {
      return undefined;
    }

    const encodedPoll = (pollIndex + "").padStart(2, "0");
    const encodedOption = (optionCode + "").padStart(2, "0");

    return `${encodedPoll}${encodedOption}`
  }

  private executeCastVoteTransaction(voterAccount: AppKeyPair, choices: string[]): Observable<string> {
    const txData = {
      voting: this.voting,
      voterAccountKeyPair: voterAccount,
      choices: choices
    };

    if (this.voting.network == "stellar") {
      return CastVoteStellarOperations.executeCastVoteTransaction(txData);
    }

    return throwError(() => "unknown network when publishing cast vote transaction");
  }
}

export interface CastVoteTransactionData {
  voting: Voting;
  voterAccountKeyPair: AppKeyPair;
  choices: string[];
}

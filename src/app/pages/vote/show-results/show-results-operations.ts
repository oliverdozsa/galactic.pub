import {delay, finalize, Observable, of, tap} from "rxjs";
import {StellarShowResultsOperation} from "./stellar-show-results-operation";
import {Voting} from "../../../data/voting";

export type PollIndex = Number;
export type PollOptionCode = Number;
export type CollectedVoteResults = Map<PollIndex, Map<PollOptionCode, Number>>;

export class ShowResultsOperations {
  static cachedResults: Map<String, CollectedVoteResults> = new Map<String, CollectedVoteResults>();
  private static isCacheLoaded = false;

  static clearResultsOf(voting: Voting) {
    this.cachedResults.delete(voting.id);
    this.saveCached();
  }

  static getResultsOf(voting: Voting): Observable<CollectedVoteResults> {
    this.tryLoadCachedIfNeeded();

    if(this.cachedResults.has(voting.id)) {
      return of(this.cachedResults.get(voting.id)!)
        .pipe(
          delay(1000)
        );
    }

    if (voting.network == "stellar") {
      return StellarShowResultsOperation.getResultsOf(voting)
        .pipe(
          tap(r => this.addToCachedIfNotEmpty(voting.id, r)),
          finalize(() => this.saveCached())
        );
    }

    return of(new Map());
  }

  private static addToCachedIfNotEmpty(votingId: string, results: CollectedVoteResults) {
    if(results.size > 0) {
      this.cachedResults.set(votingId, results);
    }
  }

  private static saveCached() {
    const replacer = (key: any, value: any) => {
      if(value instanceof Map) {
        return {
          dataType: "Map",
          value: Array.from(value.entries()),
        };
      } else {
        return value;
      }
    }

    const cachedResultsStr = JSON.stringify(this.cachedResults, replacer);
    localStorage.setItem("voteResults", cachedResultsStr)
  }

  private static tryLoadCachedIfNeeded() {
    if(this.isCacheLoaded) {
      return;
    }

    const reviver = (key: any, value: any) => {
      if(typeof value === "object" && value != null && value.dataType == "Map") {
        return new Map(value.value)
      }

      return value;
    }

    if(localStorage.getItem("voteResults")) {
      this.cachedResults = JSON.parse(localStorage.getItem("voteResults")!, reviver)
    } else {
      this.cachedResults = new Map<String, CollectedVoteResults>();
    }

    this.isCacheLoaded = true;
  }
}


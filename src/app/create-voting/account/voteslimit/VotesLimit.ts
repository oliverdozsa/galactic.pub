import {StellarVotesLimit} from "./StellarVotesLimit";

export class VotesLimit {
  constructor(public network = "", public accountBalance = -1) {
  }

  calculate(): number {
    if (this.network == "stellar") {
      return StellarVotesLimit.calculateBasedOn(this.accountBalance);
    }

    return 0;
  }
}

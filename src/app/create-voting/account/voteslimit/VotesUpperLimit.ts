import {StellarVotesUpperLimit} from "./StellarVotesUpperLimit";

export class VotesUpperLimit {
  constructor(public network = "", public accountBalance = -1) {
  }

  calculate(): number {
    if (this.network == "stellar") {
      return StellarVotesUpperLimit.calculateBasedOn(this.accountBalance);
    }

    return 0;
  }
}

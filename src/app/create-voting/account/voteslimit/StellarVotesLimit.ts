import {environment} from "../../../../environments/environment";

export class StellarVotesLimit {
  static calculateBasedOn(balanceXlm: number): number {
    const balanceMinusStartingCost = balanceXlm - (10 * environment.stellarNumOfVoteBuckets + 60)
    if (balanceMinusStartingCost > 0) {
      return Math.floor(balanceMinusStartingCost / 4);
    } else {
      return 0;
    }
  }
}

import {StellarAccountBalance} from "./stellar-account-balance";

export class AccountBalance {
  isWorking = false;
  value: number = -1;

  private isNotFound = false;

  constructor(public network: string = "", public shouldUseTestNet: boolean = true, public accountPublic: string = "") {
  }

  query(): Promise<number> {
    let balancePromise = Promise.resolve(-1);
    this.isWorking = true;
    this.isNotFound = false;

    if (this.network == "stellar") {
      balancePromise = StellarAccountBalance.queryBalanceOf(this.accountPublic, this.shouldUseTestNet);
    }

    return balancePromise.then(
      b => {
        this.isWorking = false;
        this.value = b;

        return b;
      },
      e => {
        this.isWorking = false;
        if (e.message == "Not Found") {
          this.isNotFound = true;
          this.value = -1;

          return -1.0;
        } else {
          throw e;
        }
      }
    )
  }

  reset() {
    this.value = -1;
    this.isNotFound = false;
  }

  get currency(): string {
    if (this.isNotFound) {
      return "";
    }

    if (this.network == "stellar") {
      return "XLM"
    }

    return "unknown";
  }
}

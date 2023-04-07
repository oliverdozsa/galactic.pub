import {StellarAccountBalance} from "./stellar-account-balance";

export class AccountBalance {
  isLoading = false;
  value: number = -1;

  public isNotFound = false;

  constructor(public network: string = "", public shouldUseTestNet: boolean = true, public accountPublic: string = "") {
  }

  query(): Promise<number> {
    let balancePromise = Promise.resolve(-1);
    this.isLoading = true;
    this.isNotFound = false;

    if (this.network == "stellar") {
      balancePromise = StellarAccountBalance.queryBalanceOf(this.accountPublic, this.shouldUseTestNet);
    }

    return balancePromise.then(
      b => {
        this.isLoading = false;
        this.value = b;

        return b;
      },
      e => {
        this.isLoading = false;
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

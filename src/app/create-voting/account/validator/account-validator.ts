import {StellarAccountValidator} from "./stellar-account-validator";

export class AccountValidator {
  constructor(public network: string = "", public accountPublic: string = "", public accountSecret: string = "") {
  }

  isPublicValid(): boolean {
    if(this.network == "stellar") {
      return new StellarAccountValidator(this.accountPublic, this.accountSecret).isPublicValid();
    }

    return false;
  }

  isSecretValid(): boolean {
    if(this.network == "stellar") {
      return new StellarAccountValidator(this.accountPublic, this.accountSecret).isSecretValid();
    }

    return false;
  }
}

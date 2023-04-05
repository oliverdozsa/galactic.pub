import {StellarAccountPublicKeyDerivation} from "./stellar-account-public-key-derivation";

export class AccountPublicKeyDerivation {
  constructor(public network: string = "") {
  }

  derivePublicFrom(secret: string): string {
    if (this.network == "stellar") {
      return StellarAccountPublicKeyDerivation.derivePublicFrom(secret);
    }

    return "";
  }
}

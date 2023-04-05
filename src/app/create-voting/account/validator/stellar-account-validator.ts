import {Keypair} from "stellar-sdk";

export class StellarAccountValidator {
  constructor(private accountPublic: string, private accountSecret: string) {
  }

  isPublicValid(): boolean {
    try {
      Keypair.fromPublicKey(this.accountPublic);
    } catch (error) {
      return false;
    }

    return true;
  }

  isSecretValid(): boolean {
    try {
      Keypair.fromSecret(this.accountSecret);
    } catch (error) {
      return false;
    }

    return true;
  }
}

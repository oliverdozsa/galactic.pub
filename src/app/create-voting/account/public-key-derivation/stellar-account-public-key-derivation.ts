import {Keypair} from "stellar-sdk";

export class StellarAccountPublicKeyDerivation {
  static derivePublicFrom(secret: string): string {
    return Keypair.fromSecret(secret).publicKey();
  }
}

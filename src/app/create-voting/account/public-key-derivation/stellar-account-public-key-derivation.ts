import {Keypair} from "@stellar/stellar-sdk";

export class StellarAccountPublicKeyDerivation {
  static derivePublicFrom(secret: string): string {
    return Keypair.fromSecret(secret).publicKey();
  }
}

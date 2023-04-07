import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Keypair} from "stellar-sdk";
import {AppKeyPair} from "../app-key-pair";

export class StellarGenerateTestAccount {
  static generate(httpClient: HttpClient): Observable<AppKeyPair> {
    const stellarKeyPair = Keypair.random();
    const appKeyPair = {
      publicKey: stellarKeyPair.publicKey(),
      secretKey: stellarKeyPair.secret()
    };

    return httpClient.get(`https://friendbot.stellar.org/?addr=${stellarKeyPair.publicKey()}`)
      .pipe(
        map(() => appKeyPair)
      );
  }
}

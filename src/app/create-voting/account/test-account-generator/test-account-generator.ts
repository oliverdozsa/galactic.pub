import {Keypair} from "stellar-sdk";
import {finalize, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AppKeyPair} from "../app-key-pair";
import {StellarGenerateTestAccount} from "./stellar-test-account-generator";

export class TestAccountGenerator {
  isLoading = false;

  constructor(public network = "", private httpClient: HttpClient) {
  }

  generate(): Observable<AppKeyPair> {
    this.isLoading = true;

    let result: Observable<AppKeyPair> = of({publicKey: "", secretKey: ""});

    if (this.network == "stellar") {
      result = StellarGenerateTestAccount.generate(this.httpClient);
    }

    return result
      .pipe(
        finalize(() => this.isLoading = false)
      );
  }
}

import {inject, Injectable} from '@angular/core';
import {from, map, Observable} from 'rxjs';

import * as StellarSdk from "@stellar/stellar-sdk";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StellarService {
  private mainNet = new StellarSdk.Horizon.Server("https://horizon.stellar.org");
  private testNet = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

  private server = this.testNet;

  private httpClient = inject(HttpClient);

  useTestNet() {
    this.server = this.testNet;
  }

  useMainNet() {
    this.server = this.mainNet;
  }

  getBalanceOf(accountId: string) {
    return from(this.server.loadAccount(accountId))
      .pipe(map(r => r.balances));
  }

  generateTestAccount(): Observable<string> {
    const randomKeyPair = StellarSdk.Keypair.random();
    return this.httpClient.get(`https://friendbot.stellar.org/?addr=${randomKeyPair.publicKey()}`)
      .pipe(map(() => randomKeyPair.secret()));
  }
}

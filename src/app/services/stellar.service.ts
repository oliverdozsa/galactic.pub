import {Injectable} from '@angular/core';
import {from, map} from 'rxjs';

import * as StellarSdk from "@stellar/stellar-sdk";

@Injectable({
  providedIn: 'root'
})
export class StellarService {
  private mainNet = new StellarSdk.Horizon.Server("https://horizon.stellar.org");
  private testNet = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

  private server = this.testNet;

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
}

import {StellarServers} from "../../../blockchains/StellarServers";
import {Horizon} from "stellar-sdk";

export class StellarAccountBalance {
  static queryBalanceOf(accountPublic: string, isOnTestNetwork: boolean): Promise<number> {
    const server = StellarServers.getServer(isOnTestNetwork);
    return server.accounts().accountId(accountPublic)
      .call()
      .then(r => StellarAccountBalance.findXlmBalance(r.balances));
  }

  private static findXlmBalance(balances: Horizon.BalanceLine[]): number {
    const xlmBalance = balances.find(b => b.asset_type == "native")
    return Number.parseFloat(xlmBalance!.balance);
  }
}

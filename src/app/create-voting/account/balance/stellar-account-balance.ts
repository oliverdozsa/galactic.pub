import {StellarServers} from "../../../blockchains/StellarServers";
import {HorizonApi} from "@stellar/stellar-sdk/lib/horizon";
import BalanceLine = HorizonApi.BalanceLine;

export class StellarAccountBalance {
  static queryBalanceOf(accountPublic: string, isOnTestNetwork: boolean): Promise<number> {
    const server = StellarServers.getServer(isOnTestNetwork);
    return server.accounts().accountId(accountPublic)
      .call()
      .then(r => StellarAccountBalance.findXlmBalance(r.balances));
  }

  private static findXlmBalance(balances: BalanceLine[]): number {
    const xlmBalance = balances.find(b => b.asset_type == "native")
    return Number.parseFloat(xlmBalance!.balance);
  }
}

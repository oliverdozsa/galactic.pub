import {Server} from "stellar-sdk";

export class StellarServers {
  static publicServer = new Server("https://horizon.stellar.org");
  static testServer = new Server("https://horizon-testnet.stellar.org");

  static getServer(useTestNet: boolean): Server {
    if (useTestNet) {
      return StellarServers.testServer;
    }

    return StellarServers.publicServer;
  }
}

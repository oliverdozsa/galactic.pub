import {Observable, of, Subject} from "rxjs";
import {CollectedVoteResults} from "./show-results-operations";
import {ServerApi} from "stellar-sdk";
import PaymentOperationRecord = ServerApi.PaymentOperationRecord;
import TransactionRecord = ServerApi.TransactionRecord;
import {VoteResults} from "./vote-results";
import {Voting} from "../../../data/voting";
import {StellarServers} from "../../../blockchains/StellarServers";

export class StellarShowResultsOperation {
  static getResultsOf(voting: Voting): Observable<CollectedVoteResults> {
    const collectResult = new StellarCollectResults(voting);
    return collectResult.collectResultsOf();
  }
}

class StellarCollectResults {
  results: VoteResults;

  private isPagingOngoing = false;
  private numOfRecordsProcessing = 0;
  private numOfRecordsProcessed = 0;

  private collectedVoteResults$: Subject<CollectedVoteResults> = new Subject<CollectedVoteResults>();

  private static NUM_OF_RESULTS_IN_ONE_BATCH = 25;

  constructor(private voting: Voting) {
    this.results = new VoteResults(voting);
  }

  collectResultsOf(): Observable<CollectedVoteResults> {
    const server = StellarServers.getServer(this.voting.isOnTestNetwork);

    this.isPagingOngoing = true;

    server.payments()
      .forAccount(this.voting.ballotAccountId!)
      .limit(200)
      .call()
      .then(page => this.processPage(page))
      .catch(error => this.onError(error));

    return this.collectedVoteResults$;
  }

  processPage(page: ServerApi.CollectionPage<ServerApi.PaymentOperationRecord>) {
    if (page.records && page.records.length > 0) {
      this.numOfRecordsProcessing += page.records.length;
      page.records.forEach(r => this.processRecord(r));

      page.next.call(this)
        .then(p => this.processPage(p))
    } else {
      this.isPagingOngoing = false;
      this.checkIfDone();
    }
  }

  processRecord(paymentRecord: PaymentOperationRecord) {
    paymentRecord.transaction.call(this)
      .then(t => this.onTransactionOfPaymentRecordProcessed(paymentRecord, t));
  }

  onTransactionOfPaymentRecordProcessed(paymentRecord: PaymentOperationRecord, transactionRecord: TransactionRecord) {
    this.numOfRecordsProcessing -= 1;
    this.numOfRecordsProcessed += 1;

    if (this.isNotVoteRecord(paymentRecord)) {
      return;
    }

    if(this.isAfterVotingEnded(paymentRecord)) {
      return;
    }


    this.results.addChoices(transactionRecord.memo);

    if (this.numOfRecordsProcessed % StellarCollectResults.NUM_OF_RESULTS_IN_ONE_BATCH == 0) {
      this.collectedVoteResults$.next(this.results.collected);
    }

    this.checkIfDone();
  }

  onError(error: any) {
    console.error(JSON.stringify(error));
  }

  private checkIfDone() {
    if (this.numOfRecordsProcessing == 0 && !this.isPagingOngoing) {
      this.collectedVoteResults$.next(this.results.collected);
      this.collectedVoteResults$.complete();
    }
  }

  private isNotVoteRecord(paymentRecord: PaymentOperationRecord) {
    return paymentRecord.asset_code != this.voting.assetCode || paymentRecord.asset_issuer != this.voting.issuerAccountId;
  }

  private isAfterVotingEnded(paymentRecord: PaymentOperationRecord) {
    const transactionMillis = Date.parse(paymentRecord.created_at);
    const votingEndMillis = Date.parse(this.voting.endDate);

    return transactionMillis > votingEndMillis;
  }
}

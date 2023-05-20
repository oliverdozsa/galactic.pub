import {Component, OnDestroy} from '@angular/core';
import {VotingsService} from "../../../services/votings.service";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../../services/toast.service";
import {Poll, Voting} from "../../../data/voting";
import {RejectReason} from "./reject-reason";
import {HttpErrorResponse} from "@angular/common/http";
import {finalize, Subject, takeUntil} from "rxjs";
import {loadOrDefaultProgresses, Progress} from "../../../data/progress";
import {getTransactionLink} from "./transaction-link";
import {BallotType} from "../../../create-voting/ballot-type";
import {CollectedVoteResults, ShowResultsOperations} from "./show-results-operations";
import {Chart, ChartHandling} from "./chart-handling";
import {ThemeService} from "../../../services/theme.service";
import {AppAuthService} from "../../../services/app-auth.service";
import {AuthenticationState} from "../../../data/authentication-state";

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.scss']
})
export class ShowResultsComponent implements OnDestroy {
  protected readonly RejectReason = RejectReason;
  protected readonly Chart = Chart;

  reason = RejectReason.None;

  isAuthenticated = false;

  voting: Voting = new Voting();
  isVotingReceived = false;

  progress: Progress | undefined;

  doesResultExist = false;
  areResultsAvailable = false;

  chartHandling: ChartHandling = new ChartHandling();

  get isLoading() {
    return this.isGettingVoting || this.isGettingResults;
  }

  private isGettingVoting = true;
  private isGettingResults: boolean = false;

  private destroy$ = new Subject<void>();

  get hasVotingTransaction(): boolean {
    return this.progress != undefined && this.isVotingReceived;
  }

  get transactionLink(): string {
    return getTransactionLink(this.voting, this.progress!.castedVoteTransactionId!);
  }

  constructor(public appAuth: AppAuthService, route: ActivatedRoute, private votingsService: VotingsService,
              private toastService: ToastService, private themeService: ThemeService) {
    const votingId = route.snapshot.paramMap.get("id")!;

    const progresses = loadOrDefaultProgresses();
    if (progresses.has(votingId)) {
      this.progress = progresses.get(votingId);
    }

    appAuth.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: a => this.onIsAuthenticated(a, votingId)
      });

    if(appAuth.isAuthenticated) {
      this.getVoting(votingId);
    }

    this.chartHandling.updateTheme(this.themeService.currentColors);
    themeService.themeChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: c => this.chartHandling.updateTheme(c)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRefreshClicked() {
    ShowResultsOperations.clearResultsOf(this.voting);
    this.getResults();
  }

  getChosenOptionsFor(poll: Poll): string {
    if (this.progress == undefined) {
      return "";
    }

    if (this.voting.ballotType == BallotType.MULTI_POLL) {
      const chosenOptionCode = this.progress!.selectedOptions![poll.index];
      return poll.pollOptions.find(o => o.code == chosenOptionCode)!.name;
    } else if (this.voting.ballotType == BallotType.MULTI_CHOICE) {
      return poll.pollOptions
        .filter(o => this.progress!.selectedOptions[o.code] == true)
        .map(o => o.name)
        .join(", ");
    }

    return "";
  }

  private onIsAuthenticated(authState: AuthenticationState, votingId: string) {
    this.isAuthenticated = authState == AuthenticationState.AUTHENTICATED;

    if (this.isAuthenticated) {
      this.getVoting(votingId)
    }

  }

  private getVoting(votingId: string) {
    this.isGettingVoting = true;
    this.votingsService.single(votingId)
      .subscribe({
        next: v => this.onVotingReceived(v),
        error: err => this.onGetVotingError(err)
      });
  }

  private onVotingReceived(voting: Voting) {
    this.voting = voting;
    this.isVotingReceived = true;
    this.isGettingVoting = false;

    if (this.checkIfEncryptedAndDecryptionKeyNotPresent()) {
      this.reason = RejectReason.VotingIsStillEncrypted;
    } else {
      this.getResults();
    }
  }

  private onGetVotingError(err: HttpErrorResponse) {
    if (err.status == 403) {
      this.isGettingVoting = false;

      if (this.isAuthenticated) {
        this.reason = RejectReason.VotingIsPrivateAndUserIsNotAllowed;
      } else {
        this.reason = RejectReason.VotingIsPrivateButUserIsUnauthenticated;
      }
    } else {
      this.toastService.error("Failed to show results; try again maybe!");
    }
  }

  private checkIfEncryptedAndDecryptionKeyNotPresent() {
    return this.voting.encryptedUntil != null && this.voting.decryptionKey == null;
  }

  private getResults() {
    this.isGettingResults = true;
    this.areResultsAvailable = false;
    this.doesResultExist = false;

    const sub = ShowResultsOperations.getResultsOf(this.voting)
      .pipe(
        finalize(() => {
          this.isGettingResults = false;
          sub.unsubscribe();
        })
      )
      .subscribe({
        next: r => this.onResultsAvailable(r),
        error: e => this.onGenericError(e)
      });
  }

  private onResultsAvailable(results: CollectedVoteResults) {
    if (!this.doesResultExist) {
      this.doesResultExist = results.size > 0 && Array.from(results.entries())
        .every(v => v[1].size != 0);
    }

    this.areResultsAvailable = true;

    this.chartHandling.updateResults(results, this.voting.polls);
  }

  private onGenericError(err: any) {
    this.reason = RejectReason.Unknown;
    this.isGettingVoting = false;
    this.isGettingResults = false;

    console.log(`Something went wrong. err: ${JSON.stringify(err)}`);
  }
}

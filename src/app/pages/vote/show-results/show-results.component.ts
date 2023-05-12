import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {VotingsService} from "../../../services/votings.service";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../../services/toast.service";
import {Voting} from "../../../data/voting";
import {RejectReason} from "./reject-reason";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject, takeUntil} from "rxjs";
import {loadOrDefaultProgresses, Progress} from "../../../data/progress";
import {getTransactionLink} from "./transaction-link";

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.scss']
})
export class ShowResultsComponent implements OnDestroy {
  reason = RejectReason.None;

  isAuthenticated = false;

  voting: Voting = new Voting();
  isVotingReceived = false;

  progress: Progress | undefined;

  get isLoading() {
    return this.isGettingVoting;
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

  constructor(public auth: AuthService, route: ActivatedRoute, private votingsService: VotingsService,
              private toastService: ToastService) {
    const votingId = route.snapshot.paramMap.get("id")!;

    const progresses = loadOrDefaultProgresses();
    if(progresses.has(votingId)) {
      this.progress = progresses.get(votingId);
    }

    auth.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: a => this.onIsAuthenticated(a, votingId)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRefreshClicked() {
    // TODO
  }

  private onIsAuthenticated(isAuth: boolean, votingId: string) {
    this.isAuthenticated = isAuth;

    if (isAuth) {
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
    // TODO
  }

  protected readonly RejectReason = RejectReason;
}

import {Component, Input} from '@angular/core';
import {PagingSource, VotingsService} from "../../services/votings.service";
import {AppRoutes} from "../../app-routes";
import {Page} from "../../data/page";
import {VotingSummary} from "../../data/voting.summary";
import {loadOrDefaultProgresses, Progress, ProgressState} from "../../data/progress";
import {delay, finalize} from "rxjs";

@Component({
  selector: 'app-votings-pagination',
  templateUrl: './votings-pagination.component.html',
  styleUrls: ['./votings-pagination.component.scss']
})
export class VotingsPaginationComponent {
  AppRoutes = AppRoutes;

  @Input()
  source: PagingSource = PagingSource.PUBLIC;

  @Input()
  allowCastVote: boolean = false;

  @Input()
  notFoundText: string = "";

  @Input()
  set showOnlyWhereNotTriedToCastVote(value: boolean) {
    this._showOnlyWhereNotTriedToCastVote = value;
    this.currentPage = 1;
    this.isLoading = true;
    this.getVotings();
  }

  itemsPerPage = 10;

  votings: Page<VotingSummary> = {
    items: [],
    totalCount: 0
  };

  isLoading = true;
  currentPage: number = 1;

  private progresses: Map<string, Progress>;
  private _showOnlyWhereNotTriedToCastVote: boolean = false;

  constructor(private votingsService: VotingsService) {
    this.progresses = loadOrDefaultProgresses();
  }

  ngOnInit(): void {
    this.getVotings();
  }

  get totalPages(): number {
    return Math.ceil(this.votings.totalCount / this.itemsPerPage);
  }

  getVotings() {
    this.isLoading = true;

    this.votingsService.getVotingsOf(this.source, this.currentPage, this.itemsPerPage, this._showOnlyWhereNotTriedToCastVote)
      .pipe(
        delay(700),
        finalize(() => this.onGetVotingsFinished())
      )
      .subscribe({
        next: p => this.onVotingsPageReceived(p),
        error: () => {/* TODO: show toastr */
        }
      });
  }

  onVotingsPageReceived(page: Page<VotingSummary>) {
    this.votings = page;
  }

  onGetVotingsFinished() {
    this.isLoading = false;
  }

  onSelectedPageChange(page: number) {
    this.currentPage = page;
    this.getVotings();
  }

  isExpired(voting: VotingSummary): boolean {
    const nowMillis = Date.now();
    const endMillis = Date.parse(voting.endDate)

    return endMillis <= nowMillis;
  }

  isStarted(voting: VotingSummary) {
    const nowMillis = Date.now();
    const startMillis = Date.parse(voting.startDate)

    return startMillis <= nowMillis;
  }

  areResultsAvailable(voting: VotingSummary): boolean {
    return (!this.isEncrypted(voting) || this.isEncryptionExpired(voting)) && voting.isInitialized;
  }

  isAlreadyVoted(voting: VotingSummary) {
    return this.progresses.has(voting.id) && (this.progresses.get(voting.id)!.state == ProgressState.Completed ||
      this.progresses.get(voting.id)!.state == ProgressState.CompletelyFailed);
  }

  getEncryptedUntilString(voting: VotingSummary): string {
    return new Date(Date.parse(voting.encryptedUntil)).toLocaleString();
  }

  private isEncryptionExpired(voting: VotingSummary) {
    const nowMillis = Date.now();
    const encryptedUntilMillis = (Date.parse(voting.encryptedUntil));

    return encryptedUntilMillis <= nowMillis;
  }

  private isEncrypted(voting: VotingSummary): boolean {
    return voting.encryptedUntil != null && voting.encryptedUntil.length > 0;
  }
}

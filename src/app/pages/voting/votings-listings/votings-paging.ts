import {Directive, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {VotingService} from '../../../services/voting.service';
import {Page, Voting} from '../../../services/responses';
import {ToastsService, ToastType} from '../../../services/toasts.service';

@Directive()
export abstract class VotingsPaging implements OnInit {
  authService = inject(AuthService);
  votingService = inject(VotingService);
  toastService = inject(ToastsService);

  votings: Voting[] = [];
  isLoading: boolean = true;
  isLoadingFirstTime = true;

  totalPages = 0;
  currentPage = 0;

  ngOnInit(): void {
    this.getVotingsAtPage();
  }

  onNextClicked() {
    this.isLoading = true;
    this.currentPage += 1;
    this.getVotingsAtPage();
  }

  onPrevClicked() {
    this.isLoading = true;
    this.currentPage -= 1;
    this.getVotingsAtPage();
  }

  abstract getVotingsAtPage(): void;

  onPageReceived(page: Page<Voting>) {
    this.totalPages = page.totalPages;
    this.votings = page.items;
  }

  loadingFinished() {
    this.isLoading = false;
    this.isLoadingFirstTime = false;
  }

  loadingFinishedWitError() {
    this.loadingFinished();
    this.toastService.push({type: ToastType.Error, message: "Failed to get votings! :( Try again maybe."})
  }
}

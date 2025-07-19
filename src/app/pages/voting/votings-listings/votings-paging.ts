import {Component, Directive, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {VotingService} from '../../../services/voting.service';
import {Page, Voting} from '../../../services/responses';

@Directive()
export abstract class VotingsPaging implements OnInit {
  authService = inject(AuthService);
  votingService = inject(VotingService);
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
}

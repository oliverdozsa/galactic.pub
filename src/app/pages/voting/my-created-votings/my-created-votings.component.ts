import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {NotLoggedInComponent} from '../../../components/not-logged-in/not-logged-in.component';
import {VotingService} from '../../../services/voting.service';
import {Page, Voting} from '../../../services/responses';
import {VotingListComponent} from '../../../components/voting-list/voting-list.component';
import {PaginationComponent} from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-my-created-votings',
  imports: [
    NgIf,
    NotLoggedInComponent,
    VotingListComponent,
    PaginationComponent
  ],
  templateUrl: './my-created-votings.component.html',
  styleUrl: './my-created-votings.component.css'
})
export class MyCreatedVotingsComponent implements OnInit{
  authService = inject(AuthService);
  votingService = inject(VotingService);
  votings: Voting[] = [];
  isLoading: boolean = true;

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

  private onPageReceived(page: Page<Voting>) {
    this.totalPages = page.totalPages;
    this.votings = page.items;
  }

  private getVotingsAtPage() {
    this.votingService.getCreated(this.currentPage)
      .subscribe({
        next: p => this.onPageReceived(p),
        complete: () => this.isLoading = false
      });
  }
}

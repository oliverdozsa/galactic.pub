import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {NotLoggedInComponent} from '../../../../components/not-logged-in/not-logged-in.component';
import {VotingListComponent} from '../../../../components/voting-list/voting-list.component';
import {PaginationComponent} from '../../../../components/pagination/pagination.component';
import {VotingsPaging} from '../votings-paging';

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
export class MyCreatedVotingsComponent extends VotingsPaging implements OnInit{
  getVotingsAtPage() {
    this.votingService.getCreated(this.currentPage)
      .subscribe({
        next: p => this.onPageReceived(p),
        complete: () => {
          this.isLoading = false;
          this.isLoadingFirstTime = false;
        }
      });
  }
}

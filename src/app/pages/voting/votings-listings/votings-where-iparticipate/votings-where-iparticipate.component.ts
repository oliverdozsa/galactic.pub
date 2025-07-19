import {Component, inject} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {NgIf} from '@angular/common';
import {NotLoggedInComponent} from '../../../../components/not-logged-in/not-logged-in.component';
import {PaginationComponent} from '../../../../components/pagination/pagination.component';
import {VotingListComponent} from '../../../../components/voting-list/voting-list.component';
import {MyCreatedVotingsComponent} from '../my-created-votings/my-created-votings.component';
import {VotingsPaging} from '../votings-paging';

@Component({
  selector: 'app-votings-where-iparticipate',
  imports: [
    NgIf,
    NotLoggedInComponent,
    PaginationComponent,
    VotingListComponent
  ],
  templateUrl: './votings-where-iparticipate.component.html',
  styleUrl: './votings-where-iparticipate.component.css'
})
export class VotingsWhereIParticipateComponent extends VotingsPaging {
  override getVotingsAtPage() {
    this.votingService.getWhereIParticipate(this.currentPage)
      .subscribe({
        next: p => this.onPageReceived(p),
        complete: () => {
          this.isLoading = false;
          this.isLoadingFirstTime = false;
        }
      });
  }

}

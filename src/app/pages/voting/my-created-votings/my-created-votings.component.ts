import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {NotLoggedInComponent} from '../../../components/not-logged-in/not-logged-in.component';
import {VotingService} from '../../../services/voting.service';
import {Voting} from '../../../services/responses';
import {VotingListComponent} from '../../../components/voting-list/voting-list.component';

@Component({
  selector: 'app-my-created-votings',
  imports: [
    NgIf,
    NotLoggedInComponent,
    VotingListComponent
  ],
  templateUrl: './my-created-votings.component.html',
  styleUrl: './my-created-votings.component.css'
})
export class MyCreatedVotingsComponent implements OnInit{
  authService = inject(AuthService);
  votingService = inject(VotingService);
  votings: Voting[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.votingService.getCreated()
      .subscribe({
        next: p => this.votings = p.items,
        complete: () => this.isLoading = false
      });
  }
}

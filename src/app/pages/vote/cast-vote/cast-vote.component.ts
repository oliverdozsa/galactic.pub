import { Component } from '@angular/core';
import {Voting} from "../../../data/voting";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {VotingsService} from "../../../services/votings.service";
import {ToastService} from "../../../services/toast.service";
import { BallotType } from 'src/app/create-voting/ballot-type';
import {AppAuthService} from "../../../services/app-auth.service";

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.scss']
})
export class CastVoteComponent {
  BallotType = BallotType;

  voting: Voting = new Voting();
  isLoading = false;

  constructor(private route: ActivatedRoute, public appAuth: AppAuthService,
              private votingsService: VotingsService, private toastService: ToastService) {
    const votingId = route.snapshot.paramMap.get("id")!;
    this.getVoting(votingId); // TODO: check first if authenticated
  }

  getVoting(id: string) {
    this.isLoading = true;
    this.votingsService.single(id)
      .subscribe({
        next: v => this.onVotingReceived(v),
        error: err => this.onVotingReceiveFailed()
      });
  }

  private onVotingReceived(voting: Voting) {
    this.isLoading = false;
    this.voting = voting;
  }

  private onVotingReceiveFailed() {
    this.isLoading = false;
    this.toastService.error("Failed to get voting 😞. TODO: check for unauth")
  }
}

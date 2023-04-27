import { Component } from '@angular/core';
import {Poll, PollOption, Voting} from "../../../data/voting";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {VotingsService} from "../../../services/votings.service";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.scss']
})
export class CastVoteComponent {
  voting: Voting = new Voting();
  isLoading = false;
  selectedOptions: any[] = [];

  constructor(private route: ActivatedRoute, public auth: AuthService, private votingsService: VotingsService, private toastService: ToastService) {
    const votingId = route.snapshot.paramMap.get("id")!;
    this.getVoting(votingId);
  }

  getVoting(id: string) {
    this.isLoading = true;
    this.votingsService.single(id)
      .subscribe({
        next: v => this.onVotingReceived(v),
        error: err => this.onVotingReceiveFailed()
      });
  }

  isChoiceValidFor(poll: Poll) {
    return this.selectedOptions.length > poll.index && this.selectedOptions[poll.index] != undefined;
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

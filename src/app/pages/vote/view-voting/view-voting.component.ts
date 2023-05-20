import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VotingsService} from "../../../services/votings.service";
import {ToastService} from "../../../services/toast.service";
import {Voting} from "../../../data/voting";
import {AuthService} from "@auth0/auth0-angular";
import {AppAuthService} from "../../../services/app-auth.service";
import {AuthenticationState} from "../../../data/authentication-state";

@Component({
  selector: 'app-view-voting',
  templateUrl: './view-voting.component.html',
  styleUrls: ['./view-voting.component.scss']
})
export class ViewVotingComponent {
  voting: Voting = new Voting();
  isLoading = false;

  get isEncrypted(): boolean {
    return this.voting.encryptedUntil != undefined;
  }

  constructor(private route: ActivatedRoute, private votingsService: VotingsService, private toastService: ToastService,
              public appAuth: AppAuthService) {
    const votingId = route.snapshot.paramMap.get("id")!;

    appAuth.authState$.subscribe({
      next: a => {
        if(a == AuthenticationState.AUTHENTICATED) {
          this.getVoting(votingId);
        }
      }
    });

    if(appAuth.isAuthenticated) {
      this.getVoting(votingId);
    }
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

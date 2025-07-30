import {Component, inject, Input, OnInit} from '@angular/core';
import {VotingService} from '../../../services/voting.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Voting} from '../../../services/responses';
import {ToastsService, ToastType} from '../../../services/toasts.service';
import {NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NotLoggedInComponent} from '../../../components/not-logged-in/not-logged-in.component';

@Component({
  selector: 'app-view-voting',
  imports: [
    NgIf,
    NotLoggedInComponent
  ],
  templateUrl: './view-voting.component.html',
  styleUrl: './view-voting.component.css'
})
export class ViewVotingComponent implements OnInit {
  votingService = inject(VotingService);
  spinnerService = inject(NgxSpinnerService);
  toastService = inject(ToastsService);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);

  isLoading = true;
  isError = false;

  voting: Voting | undefined = undefined;

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.activatedRoute.paramMap.subscribe({
        next: pm => this.getVoting(parseInt(pm.get("id")!))
      });
    }
  }

  getVoting(votingId: number) {
    this.isLoading = true;
    this.spinnerService.show();
    this.votingService.getSingle(votingId).subscribe({
      next: v => this.onVotingReceived(v),
      error: () => this.onVotingError()
    })
  }

  onVotingReceived(voting: Voting) {
    this.voting = voting;
    this.isLoading = false;
    this.spinnerService.hide();
  }

  onVotingError() {
    this.isLoading = false;
    this.spinnerService.hide();
    this.isError = true;
    this.toastService.push({type: ToastType.Error, message: "Failed to get voting :(."})
  }
}

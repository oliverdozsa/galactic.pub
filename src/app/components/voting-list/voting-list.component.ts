import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {Voting} from '../../services/responses';
import {NgForOf, NgIf} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {RouterLink} from '@angular/router';
import {VotingService} from '../../services/voting.service';
import {ToastsService} from '../../services/toasts.service';

@Component({
  selector: 'app-voting-list',
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './voting-list.component.html',
  styleUrl: './voting-list.component.css'
})
export class VotingListComponent {
  @Input()
  votings: Voting[] = [];

  @Input()
  set isLoading(value: boolean) {
    this._isLoading = value;

    if(this.isLoading) {
      this.spinnerService.show();
    } else {
      this.spinnerService.hide();
    }
  };

  @ViewChild("votingsDeleteModal")
  deleteModal: ElementRef | undefined;

  votingService = inject(VotingService);
  spinnerService = inject(NgxSpinnerService);
  toastsService = inject(ToastsService);

  openedVoting: Voting | undefined = undefined;
  isDeleting = false;

  get isLoading(): boolean {
    return this._isLoading
  }

  private _isLoading = false;

  isVotingDeleting(voting: Voting) {
    return this.openedVoting && this.openedVoting.id == voting.id && this.isDeleting;
  }

  onDeleteClicked(i: number) {
    this.openedVoting = this.votings[i];
    this.deleteModal?.nativeElement.showModal();
  }

  onDeleteCancelClicked() {
    this.deleteModal?.nativeElement.close();
  }

  onDeleteYesClicked() {
    this.deleteModal?.nativeElement.close();
    this.isDeleting = true;

    this.votingService.delete(this.openedVoting!.id)
      .subscribe({
        next: () => this.onDeleteVotingSuccessful(),
        error: () => this.onDeleteVotingFailed()
      })
  }

  onDeleteVotingSuccessful() {
    this.isDeleting = false;
    // TODO
  }

  onDeleteVotingFailed() {
    this.isDeleting = false;
    // TODO
  }
}

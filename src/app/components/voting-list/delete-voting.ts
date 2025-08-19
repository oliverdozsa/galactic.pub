import {VotingService} from '../../services/voting.service';
import {Toast, ToastsService} from '../../services/toasts.service';
import {Voting} from '../../services/responses';
import {ElementRef} from '@angular/core';

export class DeleteVoting {
  isDeleting = false;
  votingToDelete: Voting | undefined;

  constructor(
    private votingService: VotingService,
    private toastService: ToastsService,
    private deleteModal: ElementRef) {
  }

  isVotingDeleting(voting: Voting) {
    return this.votingToDelete && this.votingToDelete.id == voting.id && this.isDeleting;
  }

  onClicked(voting: Voting) {
    this.votingToDelete = voting;
    this.deleteModal?.nativeElement.showModal();
  }

  onCancelClicked() {
    this.deleteModal?.nativeElement.close();
  }

  onYesClicked() {
    this.deleteModal?.nativeElement.close();
    this.isDeleting = true;

    this.votingService.delete(this.votingToDelete!.id)
      .subscribe({
        next: () => this.onScucess(),
        error: () => this.onFailed()
      })
  }

  onScucess() {
    this.isDeleting = false;
    // TODO
  }

  onFailed() {
    this.isDeleting = false;
    // TODO
  }
}

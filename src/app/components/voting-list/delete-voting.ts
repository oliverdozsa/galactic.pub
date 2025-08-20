import {Voting} from '../../services/responses';
import {VotingListComponent} from './voting-list.component';
import {ToastType} from '../../services/toasts.service';

export class DeleteVoting {
  votingToDelete: Voting | undefined;

  private isYesClicked = false;

  constructor(private component: VotingListComponent) {
  }

  isDeleting(voting: Voting) {
    return this.votingToDelete && this.votingToDelete.id == voting.id && this.isYesClicked;
  }

  onClicked(voting: Voting) {
    this.votingToDelete = voting;
    this.component.deleteModal?.nativeElement.showModal();
  }

  onCancelClicked() {
    this.component.deleteModal?.nativeElement.close();
    this.votingToDelete = undefined;
  }

  onYesClicked() {
    this.isYesClicked = true;
    this.component.deleteModal?.nativeElement.close();

    this.component.votingService.delete(this.votingToDelete!.id)
      .subscribe({
        next: () => this.onSuccess(),
        error: () => this.onFailed()
      })
  }

  onSuccess() {
    this.component.votings = this.component.votings.filter(v => v.id != this.votingToDelete?.id);

    this.isYesClicked = false;
    this.votingToDelete = undefined;
    this.component.toastsService.push({type: ToastType.Success, message: "Successfully deleted voting."});
  }

  onFailed() {
    this.isYesClicked = false;
    this.votingToDelete = undefined;
    this.component.toastsService.push({type: ToastType.Error, message: "Failed to delete voting."});
  }
}

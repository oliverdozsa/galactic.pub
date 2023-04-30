import {OrchestrationStep} from "./orchestration-step";
import {CastVoteOrchestration} from "../cast-vote-orchestration";
import {CastVoteOperations} from "../cast-vote-operations";
import {Progress, ProgressState} from "../../../../../data/progress";
import {Voting} from "../../../../../data/voting";
import {ToastService} from "../../../../../services/toast.service";

export class CastVoteOnBlockchainStep extends OrchestrationStep {
  private operations: CastVoteOperations;
  private progress: Progress;
  private voting: Voting;
  private selectedOptions: any[];

  constructor(orchestration: CastVoteOrchestration, private toastService: ToastService) {
    super(orchestration);

    this.operations = orchestration.operations;
    this.progress = orchestration.progress;
    this.voting = orchestration.voting;
    this.selectedOptions = orchestration.selectedOptions;
  }

  execute(): void {
    this.progress.state = ProgressState.CastingVote;
    this.progress.selectedOptions = this.selectedOptions;

    this.operations.submitAccountCreationTransaction(
      this.progress.createAccountBlockchainTransaction!,
      this.progress.voterAccount!
    ).subscribe({
      next: () => this.onAccountCreationTransactionSuccess(),
      error: () => this.toastService.error("Failed to cast vote (error on submitting account creating tx). Try again maybe!")
    });
  }

  override complete() {
    this.progress.state = ProgressState.Completed;
    super.complete();
  }

  private onAccountCreationTransactionSuccess() {
    this.operations.castVote(this.progress.voterAccount!, this.progress.selectedOptions)
      .subscribe({
        next: txId => this.onCastVoteSuccess(txId),
        error: e => this.handleCastVoteFailure(e)
      });
  }

  private onCastVoteSuccess(transactionId: string) {
    this.progress.castedVoteTransactionId = transactionId;
    this.complete();
  }

  private handleCastVoteFailure(e: any) {
    if(e.response != undefined && e.response.status != undefined && e.response.title != undefined && e.response.status == 404) {
      this.toastService.warning("You've probably already voted!");
      this.complete();
    } else {
      this.toastService.error("Failed to cast vote (error on casting vote). Try again maybe!");
      this.fail();
    }
  }
}

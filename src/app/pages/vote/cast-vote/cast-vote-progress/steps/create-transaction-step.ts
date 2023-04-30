import {OrchestrationStep} from "./orchestration-step";
import {CastVoteOrchestration} from "../cast-vote-orchestration";
import {HttpErrorResponse} from "@angular/common/http";
import {Progress, ProgressState} from "../../../../../data/progress";
import {CastVoteCreateTransactionResponse, CastVoteService} from "../../../../../services/cast-vote.service";
import {ToastService} from "../../../../../services/toast.service";

export class CreateTransactionStep extends OrchestrationStep {
  private progress: Progress;
  private service: CastVoteService;

  constructor(orchestration: CastVoteOrchestration, private toastService: ToastService) {
    super(orchestration);

    this.progress = orchestration.progress;
    this.service = orchestration.castVoteService;
  }

  execute(): void {
    this.progress.state = ProgressState.CreatingTransaction;

    this.service.createTransaction(this.progress.message!, this.progress.revealedSignature!)
      .subscribe({
        next: r => this.onCreateTransactionSuccess(r),
        error: e => this.onCreateTransactionError(e)
      });
  }

  override complete() {
    this.progress.state = ProgressState.CreatedTransaction;
    super.complete();
  }

  private onCreateTransactionSuccess(response: CastVoteCreateTransactionResponse) {
    this.progress.createAccountBlockchainTransaction = response.transaction;
    this.complete();
  }

  private onCreateTransactionError(error: HttpErrorResponse) {
    if(error.status == 403) {
      this.service.getTransactionString(this.progress.revealedSignature!)
        .subscribe({
          next: r => this.onCreateTransactionSuccess(r),
          error: e => this.toastService.error("Failed to cast vote! Try again maybe. (error getting transaction)")
        });
    } else {
      this.toastService.error("Failed to cast vote! Try again maybe. (error creating transaction)");
      this.fail();
    }
  }
}

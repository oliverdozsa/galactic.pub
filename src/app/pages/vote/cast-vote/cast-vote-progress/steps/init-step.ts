import {OrchestrationStep} from "./orchestration-step";
import {HttpErrorResponse} from "@angular/common/http";
import {delay} from "rxjs";
import {CastVoteOrchestration} from "../cast-vote-orchestration";
import {CastVoteOperations} from "../cast-vote-operations";
import {Progress, ProgressState} from "../../../../../data/progress";
import {CastVoteInitResponse, CastVoteService} from "../../../../../services/cast-vote.service";
import {Voting} from "../../../../../data/voting";
import {ToastService} from "../../../../../services/toast.service";


export class InitStep extends OrchestrationStep {
  private progress: Progress;
  private service: CastVoteService;
  private operations: CastVoteOperations;
  private voting: Voting;

  constructor(orchestration: CastVoteOrchestration, private toastService: ToastService) {
    super(orchestration);

    this.progress = orchestration.progress;
    this.service = orchestration.castVoteService;
    this.operations = orchestration.operations;
    this.voting = orchestration.voting;
  }

  execute(): void {
    this.progress.network = this.voting.network;

    this.service.init(this.orchestration.voting.id)
      .pipe(
        delay(1500)
      )
      .subscribe({
        next: v => this.onInitSuccess(v),
        error: e => this.onInitError(e)
      })
  }

  private onInitSuccess(response: CastVoteInitResponse) {
    this.progress.publicKeyForEnvelope = response.publicKey;
    this.progress.state = ProgressState.Initialized;

    this.complete();
  }

  private onInitError(error: HttpErrorResponse) {
    if (error.status == 403) {
      const errorText = String(error.error);
      this.handleInitError(errorText)
    } else {
      this.toastService.error("Unknown status error during init!");
    }
  }

  private handleInitError(errorText: string) {
    if (errorText.includes("has already started a session")) {
      this.handleAlreadyInitializedError();
    } else if (errorText.includes("not initialized properly")) {
      this.toastService.warning("Please try again later!");
    } else {
      this.toastService.error("Unknown error during init!");
    }
  }

  private handleAlreadyInitializedError() {
    if(this.progress.publicKeyForEnvelope != undefined) {
      this.progress.state = ProgressState.Initialized;
      this.complete();
    } else {
      this.toastService.warning("It seems you've tried to vote before!");
      this.failCompletely();
    }
  }
}

import {InitStep} from "./steps/init-step";
import {ProgressState} from "../../../../data/progress";
import {SignEnvelopeStep} from "./steps/sign-envelope-step";
import {CreateTransactionStep} from "./steps/create-transaction-step";
import {CastVoteOnBlockchainStep} from "./steps/cast-vote-on-blockchain-step";
import {StepNode} from "./step-node";
import {ToastService} from "../../../../services/toast.service";
import {CastVoteOrchestration} from "./cast-vote-orchestration";

export class CastVoteStepsBuilder {
  constructor(private orchestration: CastVoteOrchestration, private toastService: ToastService) {
  }

  public buildSteps(): StepNode {
    const initStep: StepNode = {
      step: new InitStep(this.orchestration, this.toastService),
      next: undefined,
      progressStateWhenStarted: ProgressState.PreInit,
      progressStateWhenFinished: ProgressState.Initialized
    };

    const signEnvelopeStep: StepNode = {
      step: new SignEnvelopeStep(this.orchestration, this.toastService),
      next: undefined,
      progressStateWhenStarted: ProgressState.SigningEnvelope,
      progressStateWhenFinished: ProgressState.SignedEnvelope
    };

    const createTransactionStep: StepNode = {
      step: new CreateTransactionStep(this.orchestration, this.toastService),
      next: undefined,
      progressStateWhenStarted: ProgressState.CreatingTransaction,
      progressStateWhenFinished: ProgressState.CreatedTransaction
    }

    const castVoteOnBlockchainStep: StepNode = {
      step: new CastVoteOnBlockchainStep(this.orchestration, this.toastService),
      next: undefined,
      progressStateWhenStarted: ProgressState.CastingVote,
      progressStateWhenFinished: ProgressState.Completed
    };

    initStep.next = signEnvelopeStep;
    signEnvelopeStep.next = createTransactionStep;
    createTransactionStep.next = castVoteOnBlockchainStep;

    return initStep;
  }
}

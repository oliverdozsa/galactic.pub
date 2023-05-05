import {OrchestrationStep} from "./steps/orchestration-step";
import {ProgressState} from "../../../../data/progress";

export interface StepNode {
  step: OrchestrationStep,
  next: StepNode | undefined,
  progressStateWhenFinished: ProgressState,
  progressStateWhenStarted: ProgressState
}

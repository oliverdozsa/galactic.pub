import {CastVoteOrchestration} from "../cast-vote-orchestration";

export abstract class OrchestrationStep {
  constructor(protected orchestration: CastVoteOrchestration) {
  }

  abstract execute(): void;

  complete() {
    this.orchestration.stepCompleted();
  }

  fail() {
    this.orchestration.isFailed = true;
  }

  failCompletely() {
    this.orchestration.completelyFail();
  }
}

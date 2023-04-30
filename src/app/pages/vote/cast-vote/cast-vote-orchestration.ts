import {Voting} from "../../../services/voting";
import {CastVoteService} from "../../../services/cast-vote.service";
import {CastVoteOperations} from "./cast-vote-operations";
import {NbToastrService} from "@nebular/theme";
import {loadOrDefaultProgresses, Progress, ProgressState} from "../../../data/progress";
import {OrchestrationStep} from "./steps/orchestration-step";
import {InitStep} from "./steps/init-step";
import {SignEnvelopeStep} from "./steps/sign-envelope-step";
import {CreateTransactionStep} from "./steps/create-transaction-step";
import {CastVoteOnBlockchainStep} from "./steps/cast-vote-on-blockchain-step";

export class CastVoteOrchestration {
  current: StepNode | undefined;

  progress: Progress;
  operations: CastVoteOperations;

  isFailed = false;

  private progresses: Map<string, Progress>;
  private start: StepNode;

  get isCompleted(): boolean {
    return this.current == undefined;
  }

  get progressPercent(): number {
    const totalSteps = CastVoteOrchestration.countStepsLeftFrom(this.start);
    const stepsLeft = CastVoteOrchestration.countStepsLeftFrom(this.current);
    const stepsCompleted = totalSteps - stepsLeft;

    return stepsCompleted / totalSteps * 100;
  }

  constructor(public voting: Voting, public selectedOptions: any[],
              public castVoteService: CastVoteService, public toastr: NbToastrService) {
    this.operations = new CastVoteOperations(voting, castVoteService);
    this.progresses = loadOrDefaultProgresses();
    this.progress = this.getAndCreateIfNeededProgress();

    this.start = this.buildSteps();
    this.current = this.determineStepToStartFrom();
  }

  castVote() {
    this.executeCurrentStepIfExists();
  }

  restartCastVote() {
    this.progress.state = ProgressState.PreInit;
    this.current = this.determineStepToStartFrom();
    this.castVote();
  }

  stepCompleted() {
    this.saveProgress();

    if (this.current != undefined) {
      this.current = this.current.next;
    }

    this.executeCurrentStepIfExists();
  }

  completelyFail() {
    this.current = undefined;
    this.progress.state = ProgressState.CompletelyFailed;
    this.saveProgress();
  }

  private getAndCreateIfNeededProgress(): Progress {
    if (!this.progresses.has(this.voting.id)) {
      this.progresses.set(this.voting.id, new Progress());
    }

    return this.progresses.get(this.voting.id)!;
  }

  private saveProgress() {
    const progressesJsonStr = JSON.stringify(Array.from(this.progresses.entries()));
    localStorage.setItem("progresses", progressesJsonStr);
  }

  private determineStepToStartFrom(): StepNode | undefined {
    const currentState = this.progress.state;

    if (currentState == ProgressState.PreInit) {
      return this.start;
    }

    let result = this.findStepToStartFromBasedOnFinished(currentState);
    if (result != undefined) {
      return result
    }

    result = this.findStepToStartFromBasedOnStartedFrom(currentState);

    return result;
  }

  private executeCurrentStepIfExists() {
    if (this.current != undefined) {
      this.current.step.execute();
    }
  }

  private static countStepsLeftFrom(step: StepNode | undefined): number {
    let s = step;
    let stepsLeft = 0;

    while (s != undefined) {
      stepsLeft++;
      s = s.next;
    }

    return stepsLeft;
  }

  private buildSteps(): StepNode {
    const initStep: StepNode = {
      step: new InitStep(this),
      next: undefined,
      progressStateWhenStarted: ProgressState.PreInit,
      progressStateWhenFinished: ProgressState.Initialized
    };

    const signEnvelopeStep: StepNode = {
      step: new SignEnvelopeStep(this),
      next: undefined,
      progressStateWhenStarted: ProgressState.SigningEnvelope,
      progressStateWhenFinished: ProgressState.SignedEnvelope
    };

    const createTransactionStep: StepNode = {
      step: new CreateTransactionStep(this),
      next: undefined,
      progressStateWhenStarted: ProgressState.CreatingTransaction,
      progressStateWhenFinished: ProgressState.CreatedTransaction
    }

    const castVoteOnBlockchainStep: StepNode = {
      step: new CastVoteOnBlockchainStep(this),
      next: undefined,
      progressStateWhenStarted: ProgressState.CastingVote,
      progressStateWhenFinished: ProgressState.Completed
    };

    initStep.next = signEnvelopeStep;
    signEnvelopeStep.next = createTransactionStep;
    createTransactionStep.next = castVoteOnBlockchainStep;

    return initStep;
  }

  private findStepToStartFromBasedOnFinished(untilCurrentProgress: ProgressState): StepNode | undefined {
    let currentFinishedNode = this.start;
    while (currentFinishedNode != undefined && currentFinishedNode.progressStateWhenFinished != untilCurrentProgress) {
      currentFinishedNode = currentFinishedNode.next!;
    }

    if (currentFinishedNode == undefined) {
      return undefined;
    }

    return currentFinishedNode.next;
  }

  private findStepToStartFromBasedOnStartedFrom(untilCurrentProgress: ProgressState): StepNode {
    let currentStartedNode = this.start;
    while (currentStartedNode != undefined && currentStartedNode.progressStateWhenStarted != untilCurrentProgress) {
      currentStartedNode = currentStartedNode.next!;
    }

    return currentStartedNode;
  }
}

interface StepNode {
  step: OrchestrationStep,
  next: StepNode | undefined,
  progressStateWhenFinished: ProgressState,
  progressStateWhenStarted: ProgressState
}

import { Component } from '@angular/core';

export enum Step {
  BasicData,
  TechnicalData,
  Polls
}

@Component({
  selector: 'app-create-voting-steps',
  imports: [],
  templateUrl: './create-voting-steps.component.html',
  styleUrl: './create-voting-steps.component.css'
})
export class CreateVotingStepsComponent {
  Step = Step;

  currentStep = Step.BasicData;

  get isNextAvailable() {
    return this.currentStep < Step.Polls;
  }

  get isPreviousAvailable() {
    return this.currentStep > Step.BasicData;
  }

  onNextClicked() {
    if(this.currentStep < Step.Polls) {
      this.currentStep++;
    }
  }

  onPreviousClicked() {
    if(this.currentStep > Step.BasicData) {
      this.currentStep--;
    }
  }
}

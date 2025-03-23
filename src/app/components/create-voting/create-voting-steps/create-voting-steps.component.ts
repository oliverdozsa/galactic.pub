import {Component} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';
import {CreateVotingBasicDataComponent} from '../create-voting-basic-data/create-voting-basic-data.component';
import {NgIf} from '@angular/common';
import {
  CreateVotingTechnicalDataComponent
} from '../create-voting-technical-data/create-voting-technical-data.component';
import {CreateVotingPollsComponent} from '../create-voting-polls/create-voting-polls.component';

export enum Step {
  BasicData,
  TechnicalData,
  Polls
}

@Component({
  selector: 'app-create-voting-steps',
  imports: [
    CreateVotingBasicDataComponent,
    NgIf,
    CreateVotingTechnicalDataComponent,
    CreateVotingPollsComponent
  ],
  templateUrl: './create-voting-steps.component.html',
  styleUrl: './create-voting-steps.component.css'
})
export class CreateVotingStepsComponent {
  Step = Step;

  currentStep = Step.BasicData;
  votingRequest: CreateVotingRequest = new CreateVotingRequest();

  get isNextAvailable() {
    if (this.currentStep == Step.BasicData) {
      return this.isBasicDataValid;
    }

    if (this.currentStep == Step.TechnicalData) {
      return this.isTechnicalDataValid;
    }

    return this.currentStep < Step.Polls;
  }

  get isPreviousAvailable() {
    return this.currentStep > Step.BasicData;
  }

  get isCreateAvailable() {
    return this.currentStep == Step.Polls;
  }

  isBasicDataValid = false;
  isTechnicalDataValid = false;

  onNextClicked() {
    if (this.currentStep < Step.Polls) {
      this.currentStep++;
    }
  }

  onPreviousClicked() {
    if (this.currentStep > Step.BasicData) {
      this.currentStep--;
    }
  }

  onBasicDataValid(isValid: boolean) {
    this.isBasicDataValid = isValid;
  }

  onTechnicalDataValid(isValid: boolean) {
    this.isTechnicalDataValid = isValid;
  }
}

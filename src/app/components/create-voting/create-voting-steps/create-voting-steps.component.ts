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
  Polls,
  Participants
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

  currentStep = Step.Polls;
  votingRequest: CreateVotingRequest = new CreateVotingRequest();

  get isNextAvailable() {
    if (this.currentStep == Step.BasicData) {
      return this.isBasicDataValid;
    }

    if (this.currentStep == Step.TechnicalData) {
      return this.isTechnicalDataValid;
    }

    if(this.currentStep == Step.Polls) {
      return this.arePollsValid;
    }

    return this.currentStep < Step.Participants;
  }

  get isPreviousAvailable() {
    return this.currentStep > Step.BasicData;
  }

  get isCreateAvailable() {
    // TODO: check if participants are valid
    return this.currentStep == Step.Participants;
  }

  isBasicDataValid = false;
  isTechnicalDataValid = false;
  arePollsValid = false;

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

  onPollsValid(areValid: boolean) {
    this.arePollsValid = areValid;
  }
}

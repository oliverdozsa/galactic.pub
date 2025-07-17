import {Component, inject} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';
import {CreateVotingBasicDataComponent} from '../create-voting-basic-data/create-voting-basic-data.component';
import {NgIf} from '@angular/common';
import {
  CreateVotingTechnicalDataComponent
} from '../create-voting-technical-data/create-voting-technical-data.component';
import {CreateVotingPollsComponent} from '../create-voting-polls/create-voting-polls.component';
import {CreateVotingParticipantsComponent} from '../create-voting-participants/create-voting-participants.component';
import {VotingService} from '../../../services/voting.service';
import {ToastsService, ToastType} from '../../../services/toasts.service';
import {NgxSpinnerComponent, NgxSpinnerService} from 'ngx-spinner';

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
    CreateVotingPollsComponent,
    CreateVotingParticipantsComponent
  ],
  templateUrl: './create-voting-steps.component.html',
  styleUrl: './create-voting-steps.component.css'
})
export class CreateVotingStepsComponent {
  Step = Step;

  currentStep = Step.BasicData;
  votingRequest: CreateVotingRequest = new CreateVotingRequest();

  votingService = inject(VotingService);
  toastsService = inject(ToastsService);
  spinnerService = inject(NgxSpinnerService);

  get isNextAvailable() {
    if (this.currentStep == Step.BasicData) {
      return this.isBasicDataValid;
    }

    if (this.currentStep == Step.TechnicalData) {
      return this.isTechnicalDataValid;
    }

    if (this.currentStep == Step.Polls) {
      return this.arePollsValid;
    }

    return this.currentStep < Step.Participants;
  }

  get isPreviousAvailable() {
    return this.currentStep > Step.BasicData;
  }

  get isCreateAvailable() {
    return this.currentStep == Step.Participants;
  }

  get isCreateDisabled() {
    return !this.areParticipantsValid;
  }

  isBasicDataValid = false;
  isTechnicalDataValid = false;
  arePollsValid = false;
  areParticipantsValid = false;

  onNextClicked() {
    if (this.currentStep < Step.Participants) {
      this.currentStep++;
    }
  }

  onCreateClicked() {
    this.spinnerService.show();
    this.votingService.create(this.votingRequest).subscribe({
      next: () => this.onCreatedSuccessfully(),
      error: e => this.onCreateFailed(e),
      complete: () => this.spinnerService.hide()
    });
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

  onParticipantsValid(areValid: boolean) {
    this.areParticipantsValid = areValid;
  }

  onCreatedSuccessfully() {
    this.toastsService.push({message: "successfully created voting!", type: ToastType.Success});
  }

  onCreateFailed(error: any) {
    console.log(`error: ${JSON.stringify(error)}`);
    this.toastsService.push({message: "failed to create voting!", type: ToastType.Error});
  }
}

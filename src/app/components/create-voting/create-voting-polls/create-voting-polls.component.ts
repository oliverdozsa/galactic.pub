import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BallotType, CreateVotingRequest} from '../create-voting-request';
import {CreatePollRequest} from '../create-poll-request';
import {NgForOf, NgIf} from '@angular/common';
import {CreateVotingQuestionComponent} from './create-voting-question/create-voting-question.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-voting-polls',
  imports: [
    NgForOf,
    CreateVotingQuestionComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './create-voting-polls.component.html',
  styleUrl: './create-voting-polls.component.css'
})
export class CreateVotingPollsComponent {
  BallotType= BallotType;

  @Input()
  votingRequest!: CreateVotingRequest

  @Output()
  isValidChange = new EventEmitter<boolean>;

  isBallotInvalid = false;
  validationHint = "<NOT SET>";

  private pollValidations: boolean[] = [];

  get maxChoices(): number {
    if (!this.votingRequest.maxChoices) {
      return 0;
    }

    return this.votingRequest.maxChoices;
  }

  set maxChoices(value: number) {
    this.votingRequest.maxChoices = value;
    this.checkIfAllIsValid();
  }

  get isMaxChoicesValid(): boolean {
    const shouldEncrypt = this.votingRequest.dates.encryptedUntil != undefined;

    if (shouldEncrypt) {
      return this.checkMaxChoicesValidityWhenEncrypted();
    } else {
      return this.checkMaxChoicesValidityWhenUnencrypted();
    }
  }

  get maxChoicesUpperLimit() {
    const shouldEncrypt = this.votingRequest.dates.encryptedUntil != undefined;

    if (shouldEncrypt) {
      return 1;
    } else {
      return 4;
    }
  }

  get isAddingMoreQuestionsDisabled() {
    if(this.votingRequest.ballotType == BallotType.MultiChoice) {
      return this.votingRequest.polls.length >= 1;
    } else {
      return this.votingRequest.polls.length >= 4;
    }
  }

  get maxNumberOfPossibleQuestions() {
    if(this.votingRequest.ballotType == BallotType.MultiChoice) {
      return 1;
    } else {
      return 4;
    }
  }

  onAddQuestionClicked() {
    this.votingRequest.polls.push(new CreatePollRequest())
    this.pollValidations.push(false);
    this.checkIfAllIsValid();
  }

  onPollValid(validEvent: { index: number, isValid: boolean }) {
    this.pollValidations[validEvent.index] = validEvent.isValid;
    this.checkIfAllIsValid();
  }

  onQuestionDelete(index: number) {
    this.votingRequest.polls.splice(index, 1);
    this.pollValidations.splice(index, 1);
    this.checkIfAllIsValid();
  }

  onBallotTypeChange() {
    this.checkIfAllIsValid();
  }

  checkIfAllIsValid() {
    this.checkIfBallotTypeIsInvalid();

    if (this.votingRequest.polls.length == 0) {
      this.isValidChange.emit(false);
    } else {
      let areAllValid = this.pollValidations.reduce((prev, current) => prev && current);
      areAllValid = areAllValid && !this.isBallotInvalid && this.isMaxChoicesValid;
      this.isValidChange.emit(areAllValid);
    }
  }

  private checkIfBallotTypeIsInvalid() {
    if(this.votingRequest.ballotType == BallotType.MultiChoice) {
      this.isBallotInvalid = this.votingRequest.polls.length > 1;
    } else {
      this.isBallotInvalid = false;
    }
  }

  private checkMaxChoicesValidityWhenEncrypted() {
    if (this.votingRequest.maxChoices != 1) {
      this.validationHint = "When voting is encrypted, maximum choices is limited to 1."
      return false;
    }

    return true;
  }

  private checkMaxChoicesValidityWhenUnencrypted() {
    if (this.votingRequest.maxChoices &&
      this.votingRequest.maxChoices > 0 && this.votingRequest.maxChoices <= 4) {
      return true;
    }

    this.validationHint = "Must be between 1 and 4.";
    return false;
  }
}

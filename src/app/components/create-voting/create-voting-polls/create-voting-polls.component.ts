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

  private pollValidations: boolean[] = [];

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

  private checkIfAllIsValid() {
    this.checkIfBallotTypeIsInvalid();

    if (this.votingRequest.polls.length == 0) {
      this.isValidChange.emit(false);
    } else {
      let areAllValid = this.pollValidations.reduce((prev, current) => prev && current);
      areAllValid = areAllValid && !this.isBallotInvalid;
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
}

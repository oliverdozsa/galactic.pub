import {Component, Input} from '@angular/core';
import {BallotType, CreateVotingRequest, VotingVisibility} from '../create-voting-request';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidationState} from '../../../../validation-state';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-voting-basic-data',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './create-voting-basic-data.component.html',
  styleUrl: './create-voting-basic-data.component.css'
})
export class CreateVotingBasicDataComponent {
  VotingVisibility = VotingVisibility;
  BallotType = BallotType;
  ValidationState = ValidationState;

  @Input()
  votingRequest!: CreateVotingRequest;

  endDateValidationHint ="";

  set startDate(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.startDate = asDate.toISOString();
    this._startDate = value;
  }

  get startDate() {
    return this._startDate;
  }

  set endDate(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.startDate = asDate.toISOString();
    this._endDate = value;
  }

  get endDate() {
    return this._endDate;
  }

  set encryptedUntil(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.encryptedUntil = asDate.toISOString();
    this._encryptedUntil = value;
  }

  get encryptedUntil() {
    return this._encryptedUntil;
  }

  get visibilityHint(): string {
    if (this.votingRequest.visibility == VotingVisibility.Private) {
      return "Voting will be only visible to participants.";
    } else if (this.votingRequest.visibility == VotingVisibility.Unlisted) {
      return "Voting will be visible to anyone who has the link.";
    }

    return "<UNKOWN VISIBILITY>";
  }

  get ballotTypeHint(): string {
    if (this.votingRequest.ballotType == BallotType.MultiPoll) {
      return "Voting can have multiple polls with 1 choice / poll.";
    } else if (this.votingRequest.ballotType == BallotType.MultiChoice) {
      return "Voting can have only 1 poll with multiple choices."
    }

    return "<UNKOWN BALLOT TYPE>";
  }

  get endDateValidation(): ValidationState {
    if (this.startDate == "") {
      return ValidationState.None;
    }

    if (this.endDate == "") {
      return ValidationState.None;
    }

    const startDateValue = Date.parse(this.startDate);
    const endDateValue = Date.parse(this.endDate);
    const nowValue = Date.now();

    if (endDateValue > startDateValue && endDateValue > nowValue) {
      return ValidationState.Valid;
    }

    if(nowValue >= endDateValue) {
      this.endDateValidationHint = "End date must be in the future."
      return ValidationState.Invalid;
    }

    if(endDateValue <= startDateValue) {
      this.endDateValidationHint = "End date must be after start date."
      return ValidationState.Invalid;
    }

    return ValidationState.Invalid;
  }

  private _startDate: string = "";
  private _endDate: string = "";
  private _encryptedUntil: string = "";
}

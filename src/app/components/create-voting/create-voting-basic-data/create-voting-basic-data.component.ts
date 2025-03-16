import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BallotType, CreateVotingRequest, VotingVisibility} from '../create-voting-request';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {CreateVotingDates} from './create-voting-dates';
import {CreateVotingMaxChoices} from './create-voting-max-choices';

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
export class CreateVotingBasicDataComponent implements OnInit {
  VotingVisibility = VotingVisibility;
  BallotType = BallotType;

  @Input()
  votingRequest!: CreateVotingRequest;

  @Output()
  isValid = new EventEmitter<boolean>;

  datesHandler: CreateVotingDates | undefined = undefined;
  maxChoicesHandler: CreateVotingMaxChoices | undefined = undefined;

  set title(value: string) {
    this.votingRequest.title = value;
    this.checkValidityOfAll();
  }

  get title() {
    return this.votingRequest.title;
  }

  get isTitleValid() {
    return this.votingRequest.title != null &&
      this.votingRequest.title.length > 1 && this.votingRequest.title.length <= 1000;
  }

  set description(value: string) {
    this.votingRequest.description = value;
    this.checkValidityOfAll();
  }

  get description() {
    return this.votingRequest.description;
  }

  get isDescriptionValid() {
    return this.votingRequest.description != null &&
      this.votingRequest.description.length > 1 && this.votingRequest.description.length <= 1000;
  }

  set maxVoters(value: number) {
    this.votingRequest.maxVoters = value;
    this.checkValidityOfAll();
  }

  get maxVoters() {
    return this.votingRequest.maxVoters;
  }

  get isMaxVotersValid() {
    return this.votingRequest.maxVoters != undefined && this.votingRequest.maxVoters > 1 && this.votingRequest.maxVoters <= 500;
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

  set maxChoices(value: number) {
    this.maxChoicesHandler!.maxChoices = value;
    this.checkValidityOfAll();
  }

  get maxChoices(): number {
    return this.maxChoicesHandler ? this.maxChoicesHandler.maxChoices : 0;
  }

  get isMaxChoicesValid(): boolean {
    return this.maxChoicesHandler ? this.maxChoicesHandler.isMaxChoicesValid : false;
  }

  set startDate(value: string) {
    this.datesHandler!.startDate = value;
    this.checkValidityOfAll();
  }

  get startDate() {
    return this.datesHandler ? this.datesHandler.startDate : "";
  }

  get isStartDateValid() {
    return this.datesHandler ?  this.datesHandler.isStartDateValid : false;
  }

  set endDate(value: string) {
    this.datesHandler!.endDate = value;
    this.checkValidityOfAll();
  }

  get endDate() {
    return this.datesHandler ? this.datesHandler.endDate : "";
  }

  get isEndDateValid(): boolean {
    return this.datesHandler ?  this.datesHandler.isEndDateValid : false;
  }

  set shouldEncrypt(value: boolean) {
    this._shouldEncrypt = value;
    if (!value) {
      this.votingRequest.dates.encryptedUntil = "";
    }

    this.maxChoicesHandler!.shouldEncrypt = value;
    this.maxChoicesHandler!.determineMaxChoicesUpperLimit();

    this.checkValidityOfAll();
  }

  get shouldEncrypt() {
    return this._shouldEncrypt;
  }

  set encryptedUntil(value: string) {
    this.datesHandler!.encryptedUntil = value;
    this.checkValidityOfAll();
  }

  get encryptedUntil() {
    return this.datesHandler ?  this.datesHandler.encryptedUntil : "";
  }

  get isEncryptedUntilValid() {
    return this.datesHandler ?  this.datesHandler.isEncryptedUntilValid : false;
  }

  ngOnInit(): void {
    this.datesHandler = new CreateVotingDates(this.votingRequest);
    this.maxChoicesHandler = new CreateVotingMaxChoices(this.votingRequest);
    this.shouldEncrypt = this.encryptedUntil != "";
  }

  private _shouldEncrypt = false;

  private checkValidityOfAll() {
    let isAllValid = this.isTitleValid && this.isDescriptionValid && this.isMaxVotersValid &&
      this.isStartDateValid && this.isEndDateValid && this.isMaxChoicesValid;
    if (this.shouldEncrypt) {
      isAllValid = isAllValid && this.isEncryptedUntilValid;
    }

    this.isValid.emit(isAllValid);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BallotType, CreateVotingRequest, VotingVisibility} from '../create-voting-request';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import moment from 'moment';

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

  endDateValidationHint = "<NOT SET>";
  startDateValidationHint = "<NOT SET>";
  maxChoicesValidationHint = "<NOT SET>"

  maxChoicesUpperLimit = 4;

  set startDate(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.startDate = asDate.toISOString();
    this.checkValidityOfAll();
  }

  get startDate() {
    if (!this.votingRequest.dates.startDate) {
      return ""
    }

    const asDate = new Date(Date.parse(this.votingRequest.dates.startDate));
    return moment(asDate).format("YYYY-MM-DDTkk:mm");
  }

  set endDate(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.endDate = asDate.toISOString();
    this.checkValidityOfAll();
  }

  get endDate() {
    if (!this.votingRequest.dates.endDate) {
      return ""
    }

    const asDate = new Date(Date.parse(this.votingRequest.dates.endDate));
    return moment(asDate).format("YYYY-MM-DDTkk:mm");
  }

  set encryptedUntil(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.encryptedUntil = asDate.toISOString();
    this.checkValidityOfAll();
  }

  get encryptedUntil() {
    if (!this.votingRequest.dates.encryptedUntil) {
      return ""
    }

    const asDate = new Date(Date.parse(this.votingRequest.dates.encryptedUntil));
    return moment(asDate).format("YYYY-MM-DDTkk:mm");
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

  get isEndDateValid(): boolean {
    if (!this.endDate) {
      this.endDateValidationHint = "End date is necessary."
      return false;
    }

    if (!this.startDate) {
      this.endDateValidationHint = "Must have start date set for end date."
      return false;
    }

    const startDateValue = Date.parse(this.startDate);
    const endDateValue = Date.parse(this.endDate);
    const nowValue = Date.now();

    if (endDateValue <= startDateValue) {
      this.endDateValidationHint = "End date must be after start date."
      return false;
    }

    if (endDateValue <= nowValue) {
      this.endDateValidationHint = "End date must be in the future.";
      return false;
    }

    return true;
  }

  get isStartDateValid() {
    if (!this.startDate) {
      this.startDateValidationHint = "Start date is necessary.";
      return false;
    }

    return true;
  }

  get isMaxVotersValid() {
    return this.votingRequest.maxVoters != undefined && this.votingRequest.maxVoters > 1 && this.votingRequest.maxVoters <= 500;
  }

  get isDescriptionValid() {
    return this.votingRequest.description != null &&
      this.votingRequest.description.length > 1 && this.votingRequest.description.length <= 1000;
  }

  get isTitleValid() {
    return this.votingRequest.title != null &&
      this.votingRequest.title.length > 1 && this.votingRequest.title.length <= 1000;
  }

  get isEncryptedUntilValid() {
    if (!this.encryptedUntil) {
      return false;
    }

    const nowValue = Date.now();
    const encryptedUntilValue = Date.parse(this.encryptedUntil);

    return encryptedUntilValue > nowValue;
  }

  set title(value: string) {
    this.votingRequest.title = value;
    this.checkValidityOfAll();
  }

  get title() {
    return this.votingRequest.title;
  }

  set description(value: string) {
    this.votingRequest.description = value;
    this.checkValidityOfAll();
  }

  get description() {
    return this.votingRequest.description;
  }

  set maxVoters(value: number) {
    this.votingRequest.maxVoters = value;
    this.checkValidityOfAll();
  }

  get maxVoters() {
    return this.votingRequest.maxVoters;
  }

  set shouldEncrypt(value: boolean) {
    this._shouldEncrypt = value;
    if (!value) {
      this.votingRequest.dates.encryptedUntil = "";
    }

    this.determineMaxChoicesUpperLimit();
    this.checkValidityOfAll();
  }

  get shouldEncrypt() {
    return this._shouldEncrypt;
  }

  get maxChoices(): number {
    if (!this.votingRequest.maxChoices) {
      return 0;
    }

    return this.votingRequest.maxChoices;
  }

  set maxChoices(value: number) {
    this.votingRequest.maxChoices = value;
    this.checkValidityOfAll();
  }

  get isMaxChoicesValid(): boolean {
    if (this.shouldEncrypt) {
      return this.checkMaxChoicesValidityWhenEncrypted();
    } else {
      return this.checkMaxChoicesValidityWhenUnencrypted();
    }
  }

  ngOnInit(): void {
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

  private determineMaxChoicesUpperLimit() {
    if (this.shouldEncrypt) {
      this.maxChoicesUpperLimit = 1;
    } else {
      this.maxChoicesUpperLimit = 4;
    }
  }

  private checkMaxChoicesValidityWhenEncrypted() {
    if (this.votingRequest.maxChoices != 1) {
      this.maxChoicesValidationHint = "When voting is encrypted, maximum choices is limited to 1."
      return false;
    }

    return true;
  }

  private checkMaxChoicesValidityWhenUnencrypted() {
    if (this.votingRequest.maxChoices &&
      this.votingRequest.maxChoices > 0 && this.votingRequest.maxChoices <= 4) {
      return true;
    }

    this.maxChoicesValidationHint = "Must be between 1 and 4.";
    return false;
  }
}

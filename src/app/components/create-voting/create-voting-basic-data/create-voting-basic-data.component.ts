import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BallotType, CreateVotingRequest, VotingVisibility} from '../create-voting-request';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {CreateVotingDates} from './create-voting-dates';
import {CreateVotingLimitations} from './create-voting-limitations';
import {CreateVotingTitleAndDesc} from './create-voting-title-and-desc';

export enum CreateVotingBasicDataType {
  Title,
  Description,
  NumOfVoters,
  MaxChoices,
  StartDate,
  EndDate,
  EncryptedUntil
}

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
  votingRequest = new CreateVotingRequest();

  @Output()
  isValid = new EventEmitter<boolean>;

  datesHandler: CreateVotingDates;
  limitationsHandler: CreateVotingLimitations;
  titleAndDescHandler: CreateVotingTitleAndDesc;

  private dataValidations = new Map<CreateVotingBasicDataType, boolean>();
  private requiredDataTypes = Object.keys(CreateVotingBasicDataType)
    .filter(t => !isNaN(Number(t)));

  constructor() {
    this.titleAndDescHandler = new CreateVotingTitleAndDesc(this.votingRequest);
    this.limitationsHandler = new CreateVotingLimitations(this.votingRequest);
    this.datesHandler = new CreateVotingDates(this.votingRequest);
  }

  ngOnInit(): void {
    this.titleAndDescHandler.votingRequest = this.votingRequest;
    this.limitationsHandler.votingRequest = this.votingRequest
    this.datesHandler.votingRequest = this.votingRequest;

    this.titleAndDescHandler.validationEvent.subscribe({next: v => this.handleDataValidationEvent(v)})
    this.limitationsHandler.validationEvent.subscribe({next: v => this.handleDataValidationEvent(v)})
    this.datesHandler.validationEvent.subscribe({next: v => this.handleDataValidationEvent(v)})

    this.limitationsHandler.shouldEncrypt = this.datesHandler.encryptedUntil != "";
  }

  handleDataValidationEvent(event$: { type: CreateVotingBasicDataType, isValid: boolean }) {
    this.dataValidations.set(event$.type, event$.isValid);
    this.checkValidityOfAll();
  }

  private checkValidityOfAll() {
    let numOfValids = 0;
    for(let isValid in this.dataValidations.values()) {
      numOfValids += isValid ? 1 : 0;
    }

    this.isValid.emit(numOfValids == this.requiredDataTypes.length);

    // let isAllValid = this.isTitleValid && this.isDescriptionValid && this.isMaxVotersValid &&
    //   this.isStartDateValid && this.isEndDateValid && this.isMaxChoicesValid;
    // if (this.shouldEncrypt) {
    //   isAllValid = isAllValid && this.isEncryptedUntilValid;
    // }
    //
    // this.isValid.emit(isAllValid);
  }
}

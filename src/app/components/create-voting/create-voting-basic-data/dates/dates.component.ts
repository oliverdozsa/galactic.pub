import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import moment from 'moment';
import {CreateVotingRequest} from '../../create-voting-request';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dates',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.css'
})
export class DatesComponent implements OnInit {
  @Input()
  votingRequest!: CreateVotingRequest;

  @Output()
  allValidChange = new EventEmitter<boolean>();

  @Output()
  shouldEncryptChange = new EventEmitter<boolean>();

  endDateValidationHint = "<NOT SET>";
  startDateValidationHint = "<NOT SET>";

  set startDate(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.startDate = asDate.toISOString();
    this.checkIfAllValid();
  }

  get startDate() {
    if (!this.votingRequest.dates.startDate) {
      return "";
    }

    const asDate = new Date(Date.parse(this.votingRequest.dates.startDate));
    return moment(asDate).format("YYYY-MM-DDTkk:mm");
  }

  get isStartDateValid() {
    if (!this.startDate) {
      this.startDateValidationHint = "Start date is necessary.";
      return false;
    }

    return true;
  }

  set endDate(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.endDate = asDate.toISOString();
    this.checkIfAllValid();
  }

  get endDate() {
    if (!this.votingRequest.dates.endDate) {
      return "";
    }

    const asDate = new Date(Date.parse(this.votingRequest.dates.endDate));
    return moment(asDate).format("YYYY-MM-DDTkk:mm");
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

  set encryptedUntil(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.encryptedUntil = asDate.toISOString();
    this.checkIfAllValid();
  }

  get encryptedUntil() {
    if (!this.votingRequest.dates.encryptedUntil) {
      return "";
    }

    const asDate = new Date(Date.parse(this.votingRequest.dates.encryptedUntil));
    return moment(asDate).format("YYYY-MM-DDTkk:mm");
  }

  get isEncryptedUntilValid() {
    if (!this.encryptedUntil) {
      return false;
    }

    const nowValue = Date.now();
    const encryptedUntilValue = Date.parse(this.encryptedUntil);

    return encryptedUntilValue > nowValue;
  }

  set shouldEncrypt(value: boolean) {
    this._shouldEncrypt = value;
    this.shouldEncryptChange.emit(value);
    this.checkIfAllValid();
  }

  get shouldEncrypt(): boolean {
    return this._shouldEncrypt;
  }

  ngOnInit() {
    if (this.votingRequest.dates.encryptedUntil) {
      this.shouldEncrypt = true;
    }

    this.checkIfAllValid();
  }

  private _shouldEncrypt = false;

  private checkIfAllValid() {
    let allValid = this.isStartDateValid && this.isEndDateValid;
    if (this.shouldEncrypt) {
      allValid = allValid && this.isEncryptedUntilValid;
    }

    this.allValidChange.emit(allValid);
  }
}

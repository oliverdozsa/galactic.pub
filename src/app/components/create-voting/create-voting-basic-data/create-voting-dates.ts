import {CreateVotingRequest} from '../create-voting-request';
import moment from 'moment/moment';
import {Subject} from 'rxjs';
import {CreateVotingBasicDataType} from './create-voting-basic-data.component';

export class CreateVotingDates {
  endDateValidationHint = "<NOT SET>";
  startDateValidationHint = "<NOT SET>";

  validationEvent =
    new Subject<{type: CreateVotingBasicDataType, isValid: boolean}>();

  set startDate(value: string) {
    const asDate = new Date(Date.parse(value));
    this.votingRequest.dates.startDate = asDate.toISOString();
    this.validationEvent.next({type: CreateVotingBasicDataType.StartDate, isValid: this.isStartDateValid});
  }

  get startDate() {
    if (!this.votingRequest.dates.startDate) {
      return ""
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
    this.validationEvent.next({type: CreateVotingBasicDataType.EndDate, isValid: this.isEndDateValid});
  }

  get endDate() {
    if (!this.votingRequest.dates.endDate) {
      return ""
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
    this.validationEvent.next({type: CreateVotingBasicDataType.EncryptedUntil, isValid: this.isEncryptedUntilValid});
  }

  get encryptedUntil() {
    if (!this.votingRequest.dates.encryptedUntil) {
      return ""
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

  constructor(public votingRequest: CreateVotingRequest) {
  }
}

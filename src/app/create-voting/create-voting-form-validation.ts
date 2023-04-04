import {CreateVotingForm} from "./create-voting-form";
import {Authorization} from "./authorization";

export class CreateVotingFormValidation {
  private tokenIdentifierRegExp = new RegExp("^[0-9a-z]+$");

  constructor(private form: CreateVotingForm) {
  }

  get isTitleValid(): boolean {
    return this.form.title.length > 1 && this.form.title.length < 1000;
  }

  get isTokenIdentifierValid(): boolean {
    return this.form.tokenIdentifier == undefined || this.form.tokenIdentifier.length == 0 ||
      (this.tokenIdentifierRegExp.test(this.form.tokenIdentifier) && this.form.tokenIdentifier.length >= 2 &&
        this.form.tokenIdentifier.length <= 8);
  }

  get isAuthorizationValid(): boolean {
    if (this.form.authorization == Authorization.EMAILS) {
      return this.form.authorizationEmails.size > 0;
    }

    return false;
  }

  get isEncryptedUntilValid(): boolean {
    const hoursUntilEncrypted = (this.form.encryptedUntil.valueOf() - Date.now()) / (1000 * 60 * 60);
    return !this.form.isEncrypted || (this.form.isEncrypted && hoursUntilEncrypted >= 2)
  }

  get isStartDateValid(): boolean {
    return this.form.startDate.valueOf() < this.form.endDate.valueOf()
  }

  get isEndDateValid(): boolean {
    const hoursUntilEndDateFromNow = (this.form.endDate.valueOf() - Date.now()) / (1000 * 60 * 60);
    const isEndDateAfterStartDate = this.form.endDate.valueOf() > this.form.startDate.valueOf();
    const hoursBetweenStartAndEnd = (this.form.endDate.valueOf() - this.form.startDate.valueOf()) / (1000 * 60 * 60);

    return isEndDateAfterStartDate && hoursUntilEndDateFromNow >= 2 && hoursBetweenStartAndEnd >= 2;
  }
}

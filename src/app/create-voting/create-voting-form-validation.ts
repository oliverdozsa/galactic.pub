import {CreateVotingForm} from "./create-voting-form";
import {Authorization} from "./authorization";
import {AccountValidator} from "./account/validator/account-validator";
import {VotingQuestionValidation} from "./voting-question-validation";
import {VotingQuestion} from "./voting-question";

export class CreateVotingFormValidation {
  private tokenIdentifierRegExp = new RegExp("^[0-9a-z]+$");
  private fundingAccountValidator: AccountValidator = new AccountValidator();


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

  get isFundingAccountPublicValid(): boolean {
    this.fundingAccountValidator.accountPublic = this.form.fundingAccountPublic;
    this.fundingAccountValidator.network = this.form.selectedNetwork;
    return this.fundingAccountValidator.isPublicValid();
  }

  get areQuestionsValid(): boolean {
    return this.form.questions.length > 0 &&
      this.form.questions.every(q => this.isValidQuestion(q));
  }

  get isOrganizerValid(): boolean {
    return !this.form.isInvitesBased || this.form.organizerIfInvitesBased.length > 0;
  }

  get isMaxChoicesValid(): boolean {
    const maxPossible = this.maxPossibleChoices.determine(this);
    return this.ballotType == BallotType.MULTI_POLL ||
      (this.ballotType == BallotType.MULTI_CHOICE && this.maxChoices > 0 && this.maxChoices <= maxPossible);
  }

  getForQuestionAt(i: number): VotingQuestionValidation {
    return new VotingQuestionValidation(this.form.questions[i]);
  }

  private isValidQuestion(votingQuestion: VotingQuestion) {
    return new VotingQuestionValidation(votingQuestion).isValid
  }
}

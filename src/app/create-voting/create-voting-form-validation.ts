import {CreateVotingForm} from "./create-voting-form";
import {Authorization} from "./authorization";
import {AccountValidator} from "./account/validator/account-validator";
import {VotingQuestionValidation} from "./voting-question-validation";
import {VotingQuestion} from "./voting-question";
import {MaxVotingQuestionsOrChoices} from "./account/max-voting-questions-or-choices";
import {BallotType} from "./ballot-type";
import {environment} from "../../environments/environment";

export class CreateVotingFormValidation {
  private tokenIdentifierRegExp = new RegExp("^[0-9a-z]+$");
  private fundingAccountValidator: AccountValidator = new AccountValidator();
  private maxVotingQuestionsOrChoices: MaxVotingQuestionsOrChoices = new MaxVotingQuestionsOrChoices();


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

  get isFundingAccountSecretValid() {
    this.fundingAccountValidator.accountSecret = this.form.fundingAccountSecret;
    this.fundingAccountValidator.network = this.form.selectedNetwork;
    return this.fundingAccountValidator.isSecretValid();
  }

  get areQuestionsValid(): boolean {
    return this.form.questions.length > 0 &&
      this.form.questions.every(q => this.isValidQuestion(q));
  }

  get isOrganizerValid(): boolean {
    return !this.form.isInvitesBased || this.form.organizerIfInvitesBased.length > 0;
  }

  get isMaxChoicesValid(): boolean {
    const maxPossible = this.maxVotingQuestionsOrChoices.determine(this.form);
    return this.form.ballotType == BallotType.MULTI_POLL ||
      (this.form.ballotType == BallotType.MULTI_CHOICE && this.form.maxChoices > 0 && this.form.maxChoices <= maxPossible);
  }

  get isDescriptionValid() {
    return this.form.description.length <= 1000;
  }

  get isVotesLimitValid(): boolean {
    const maxPossibleVotesLimitWithBalance = this.form.votesUpperLimit.calculate();

    return this.form.votesLimit != undefined &&
      this.form.votesLimit <= environment.maxVotesLimit &&
      this.form.votesLimit > 1 && maxPossibleVotesLimitWithBalance >= this.form.votesLimit;
  }

  get isAuthorizationInputValid(): boolean {
    if (this.form.authorization == Authorization.EMAILS) {
      return this.form.authorizationEmails.size > 0;
    }

    return false;
  }

  private isValidQuestion(votingQuestion: VotingQuestion) {
    return new VotingQuestionValidation(votingQuestion).isValid
  }
}

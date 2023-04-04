import {CreateVotingFormValidation} from "./create-voting-form-validation";
import {Visibility} from "./visibility";
import {Authorization} from "./authorization";
import {AccountBalance} from "./account/balance/account-balance";

export class CreateVotingForm {
  title: string = "";
  tokenIdentifier: string | undefined = undefined;
  visibility: Visibility = Visibility.PRIVATE;

  authorization: Authorization = Authorization.EMAILS;
  authorizationEmails: Set<string> = new Set<string>();

  isEncrypted: boolean = false;
  encryptedUntil: Date = new Date();

  startDate: Date = new Date();
  endDate: Date = new Date();

  isGeneratingFundingAccount: boolean = false;
  fundingAccountBalance: AccountBalance = new AccountBalance();

  readonly validation: CreateVotingFormValidation;

  get fundingAccountPublic(): string {
    return this._fundingAccountPublic;
  }

  set fundingAccountPublic(value: string) {
    this._fundingAccountPublic = value;
    this.accountValidator.accountPublic = value;
    this.fundingAccountBalance.accountPublic = value;
    this.queryBalanceIfNeeded();
  }

  private _fundingAccountPublic = "";

  constructor() {
    this.validation = new CreateVotingFormValidation(this);
  }
}

import {CreateVotingFormValidation} from "./create-voting-form-validation";
import {Visibility} from "./visibility";
import {Authorization} from "./authorization";
import {AccountBalance} from "./account/balance/account-balance";
import {VotesLimit} from "./account/voteslimit/VotesLimit";
import {VotingQuestion} from "./voting-question";
import {VotingQuestionValidation} from "./voting-question-validation";
import {BallotType} from "./ballot-type";

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
  votesLimit: VotesLimit = new VotesLimit();

  questions: VotingQuestion[] = [];

  isInvitesBased: boolean = false;
  organizerIfInvitesBased: string = "";

  ballotType: BallotType = BallotType.MULTI_POLL;
  maxChoices: number = 1;

  description: string = "";

  readonly validation: CreateVotingFormValidation;

  get fundingAccountPublic(): string {
    return this._fundingAccountPublic;
  }

  set fundingAccountPublic(value: string) {
    this._fundingAccountPublic = value;
    this.fundingAccountBalance.accountPublic = value;
    this.queryBalanceIfNeeded();
  }

  private _fundingAccountPublic = "";

  get selectedNetwork(): string {
    return this._selectedNetwork;
  }

  set selectedNetwork(value: string) {
    this._selectedNetwork = value;
    this.accountPublicDerivation.network = value;
    this.fundingAccountBalance.network = value;
    this.votesLimit.network = value;
  }


  private _selectedNetwork = "";

  constructor() {
    this.validation = new CreateVotingFormValidation(this);
  }

  private queryBalanceIfNeeded() {
    if (this.validation.isFundingAccountPublicValid) {
      this.fundingAccountBalance.query()
        .then(
          b => this.votesLimit.accountBalance = b,
          () => this.votesLimit.accountBalance = -1)
    } else {
      this.fundingAccountBalance.reset();
      this.votesLimit.accountBalance = -1;
    }
  }
}

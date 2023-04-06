import {CreateVotingFormValidation} from "./create-voting-form-validation";
import {Visibility} from "./visibility";
import {Authorization} from "./authorization";
import {AccountBalance} from "./account/balance/account-balance";
import {VotesUpperLimit} from "./account/voteslimit/VotesUpperLimit";
import {VotingQuestion} from "./voting-question";
import {BallotType} from "./ballot-type";
import {AccountPublicKeyDerivation} from "./account/public-key-derivation/account-public-key-derivation";

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
  votesUpperLimit: VotesUpperLimit = new VotesUpperLimit();

  questions: VotingQuestion[] = [];

  isInvitesBased: boolean = false;
  organizerIfInvitesBased: string = "";

  ballotType: BallotType = BallotType.MULTI_POLL;
  maxChoices: number = 1;

  description: string = "";

  private accountPublicKeyDerivation: AccountPublicKeyDerivation = new AccountPublicKeyDerivation();

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

  get fundingAccountSecret(): string {
    return this._fundingAccountSecret;
  }

  set fundingAccountSecret(value: string) {
    this._fundingAccountSecret = value;
    this.derivePublicFromSecretIfPossible();
  }

  private _fundingAccountSecret = "";

  get selectedNetwork(): string {
    return this._selectedNetwork;
  }

  set selectedNetwork(value: string) {
    this._selectedNetwork = value;
    this.accountPublicKeyDerivation.network = value;
    this.fundingAccountBalance.network = value;
    this.votesUpperLimit.network = value;
  }

  get shouldAccountPublicToBeDeterminedAutomatically() {
    return this.selectedNetwork == "stellar";
  };

  private _selectedNetwork = "";

  get shouldUseTestNet() {
    return this._shouldUseTestNet;
  }

  set shouldUseTestNet(value: boolean) {
    this._shouldUseTestNet = value;
    this.fundingAccountBalance.shouldUseTestNet = value;
    this.queryBalanceIfNeeded();
  }

  get votesLimit(): number | undefined {
    return this._votesLimit;
  }

  set votesLimit(value: number | undefined) {
    this._votesLimit = value;
  }

  private _votesLimit: number | undefined;

  private _shouldUseTestNet = true;

  constructor() {
    this.validation = new CreateVotingFormValidation(this);
  }

  private queryBalanceIfNeeded() {
    if (this.validation.isFundingAccountPublicValid) {
      this.fundingAccountBalance.query()
        .then(
          b => this.votesUpperLimit.accountBalance = b,
          () => this.votesUpperLimit.accountBalance = -1)
    } else {
      this.fundingAccountBalance.reset();
      this.votesUpperLimit.accountBalance = -1;
    }
  }

  private derivePublicFromSecretIfPossible() {
    if (this.shouldAccountPublicToBeDeterminedAutomatically) {
      if (this.validation.isFundingAccountSecretValid) {
        this.fundingAccountPublic = this.accountPublicKeyDerivation.derivePublicFrom(this.fundingAccountSecret);
      } else {
        this.fundingAccountPublic = "";
      }
    }
  }
}

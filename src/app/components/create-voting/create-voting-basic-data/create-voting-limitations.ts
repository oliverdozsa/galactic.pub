import {BallotType, CreateVotingRequest, VotingVisibility} from '../create-voting-request';
import {Subject} from 'rxjs';
import {CreateVotingBasicDataType} from './create-voting-basic-data.component';

export class CreateVotingLimitations {
  validationHint = "<NOT SET>";
  upperLimit = 4;

  validationEvent =
    new Subject<{type: CreateVotingBasicDataType, isValid: boolean}>();

  private _shouldEncrypt = false;

  get isMaxChoicesValid(): boolean {
    if (this.shouldEncrypt) {
      return this.checkMaxChoicesValidityWhenEncrypted();
    } else {
      return this.checkMaxChoicesValidityWhenUnencrypted();
    }
  }

  set shouldEncrypt(value: boolean) {
    if (!value) {
      this.votingRequest.dates.encryptedUntil = "";
    }

    this._shouldEncrypt = value;
    this.determineMaxChoicesUpperLimit();
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
    this.validationEvent.next({type: CreateVotingBasicDataType.MaxChoices, isValid: this.isMaxChoicesValid});
  }

  set maxVoters(value: number) {
    this.votingRequest.maxVoters = value;
    this.validationEvent.next({type: CreateVotingBasicDataType.NumOfVoters, isValid: this.isMaxVotersValid});
  }

  get maxVoters() {
    return this.votingRequest.maxVoters;
  }

  get isMaxVotersValid() {
    return this.votingRequest.maxVoters != undefined && this.votingRequest.maxVoters > 1 && this.votingRequest.maxVoters <= 500;
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

  constructor(public votingRequest: CreateVotingRequest) {
  }

  determineMaxChoicesUpperLimit() {
    if (this.shouldEncrypt) {
      this.upperLimit = 1;
    } else {
      this.upperLimit = 4;
    }
  }

  private checkMaxChoicesValidityWhenEncrypted() {
    if (this.votingRequest.maxChoices != 1) {
      this.validationHint = "When voting is encrypted, maximum choices is limited to 1."
      return false;
    }

    return true;
  }

  private checkMaxChoicesValidityWhenUnencrypted() {
    if (this.votingRequest.maxChoices &&
      this.votingRequest.maxChoices > 0 && this.votingRequest.maxChoices <= 4) {
      return true;
    }

    this.validationHint = "Must be between 1 and 4.";
    return false;
  }
}

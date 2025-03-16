import {CreateVotingRequest} from '../create-voting-request';

export class CreateVotingMaxChoices {
  validationHint = "<NOT SET>";
  upperLimit = 4;

  private _shouldEncrypt = false;

  get isMaxChoicesValid(): boolean {
    if (this.shouldEncrypt) {
      return this.checkMaxChoicesValidityWhenEncrypted();
    } else {
      return this.checkMaxChoicesValidityWhenUnencrypted();
    }
  }

  set shouldEncrypt(value: boolean) {
    this._shouldEncrypt = value;
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
  }

  constructor(private votingRequest: CreateVotingRequest) {
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

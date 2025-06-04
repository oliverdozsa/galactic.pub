import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateVotingRequest, VotingVisibility} from '../../create-voting-request';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-limitations',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './limitations.component.html',
  styleUrl: './limitations.component.css'
})
export class LimitationsComponent implements OnInit {
  @Input()
  votingRequest!: CreateVotingRequest;

  @Output()
  allValidChange = new EventEmitter<boolean>();

  VotingVisibility = VotingVisibility;

  validationHint = "<NOT SET>";

  private _shouldEncrypt = false;

  @Input()
  set shouldEncrypt(value: boolean) {
    if (!value) {
      this.votingRequest.dates.encryptedUntil = undefined;
    }

    this._shouldEncrypt = value;
  }

  get shouldEncrypt() {
    return this._shouldEncrypt;
  }

  set maxVoters(value: number) {
    this.votingRequest.maxVoters = value;
    this.checkIfAllValid();
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

  ngOnInit() {
    this.checkIfAllValid();
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

  private checkIfAllValid() {
    this.allValidChange.emit(this.isMaxVotersValid);
  }
}

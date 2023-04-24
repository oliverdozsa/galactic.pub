import {Component, Input} from '@angular/core';
import {Voting} from "../../../../data/voting";

@Component({
  selector: 'app-view-voting-encryption',
  templateUrl: './view-voting-encryption.component.html',
  styleUrls: ['./view-voting-encryption.component.scss']
})
export class ViewVotingEncryptionComponent {
  @Input()
  voting: Voting = new Voting();

  get isEncrypted(): boolean {
    return this.voting.encryptedUntil != undefined;
  }

  get isEncryptionExpired(): boolean {
    if(this.voting.encryptedUntil != undefined) {
      const now = Date.now();
      const encryptionExpires = Date.parse(this.voting.encryptedUntil).valueOf();

      return encryptionExpires <= now
    }

    return false;
  }

}

import {Component, Input} from '@angular/core';
import {Voting} from "../../../../data/voting";

@Component({
  selector: 'app-view-voting-dates',
  templateUrl: './view-voting-dates.component.html',
  styleUrls: ['./view-voting-dates.component.scss']
})
export class ViewVotingDatesComponent {
  @Input()
  voting: Voting = new Voting();

  get isExpired(): boolean {
    return true;
    return this.remainingTotalSecondsLeftUntilVotingEnds == 0;
  }

  get isEncrypted(): boolean {
    return this.voting?.encryptedUntil != undefined;
  }

  get isEncryptionExpired(): boolean {
    return this.isEncrypted && this.remainingTotalSecondsLeftUntilEncryptionEnds == 0;
  }

  get remainingTotalSecondsLeftUntilVotingEnds(): number {
    return this.calcRemainingTotalSeconds(this.voting.endDate);
  }

  get remainingTotalSecondsLeftUntilEncryptionEnds(): number {
    if (this.voting.encryptedUntil != undefined) {
      return this.calcRemainingTotalSeconds(this.voting.encryptedUntil!);
    }

    return 0;
  }

  private calcRemainingTotalSeconds(dateUntil: string) {
    const now = Date.now();
    const end = Date.parse(dateUntil);

    const diffSeconds = Math.floor((end - now) / 1000);
    return diffSeconds > 0 ? diffSeconds : 0;
  }
}

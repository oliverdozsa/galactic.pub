import {Component, Input} from '@angular/core';
import {Voting} from "../../../../data/voting";

@Component({
  selector: 'app-view-voting-dates',
  templateUrl: './view-voting-dates.component.html',
  styleUrls: ['./view-voting-dates.component.scss']
})
export class ViewVotingDatesComponent {
  @Input()
  voting: Voting | undefined;

  private remainingTotalSecondsLeftUntilVotingEnds(): number[] {
    if (this.voting) {
      // const totalSecondsRemaining = this.calcRemainingTotalSeconds(this.voting.endDate);
      const totalSecondsRemaining = 10000;
      return this.remainingTimeFromSeconds(totalSecondsRemaining)
    }

    return [];
  }

  private remainingTotalSecondsLeftUntilEncryptionEnds(): number {
    if (this.voting && this.voting.encryptedUntil != undefined) {
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

  private remainingTimeFromSeconds(secondsTotal: number) {
    const daysLeft = Math.floor(secondsTotal/ 60 / 60 / 24);
    const hoursLeft = Math.floor((secondsTotal / 60 / 60) % 24);
    const minutesLeft = Math.floor((secondsTotal / 60) % 60);
    const secondsLeft = Math.floor((secondsTotal) % 60);

    return [secondsLeft, minutesLeft, hoursLeft, daysLeft];
  }

}

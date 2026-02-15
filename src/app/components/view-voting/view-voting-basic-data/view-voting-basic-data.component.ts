import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Voting} from '../../../services/responses';
import {getVotingStatus, getVotingStatusText, VotingStatus} from '../../../pages/voting/voting-utils';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-view-voting-basic-data',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './view-voting-basic-data.component.html',
  styleUrl: './view-voting-basic-data.component.css'
})
export class ViewVotingBasicDataComponent {
  @Input()
  voting!: Voting;

  VotingStatus = VotingStatus;

  toLocaleDateTime(dateString: string) {
    const date = new Date(Date.parse(dateString));
    return date.toLocaleString();
  }

  get numOfVotersClass() {
    const percentFull = this.numOfVotersPercentFull;
    if(percentFull < 60) {
      return "text-success";
    } else if(percentFull >=60 && percentFull < 100) {
      return "text-warning";
    } else {
      return "text-error"
    }
  }

  get numOfVotersPercentFull() {
    return this.voting.numOfVoters / this.voting.maxVoters * 100;
  }

  get votingStatus() {
    return getVotingStatus(this.voting);
  }

  get statusText(): string {
    return getVotingStatusText(this.votingStatus);
  }
}

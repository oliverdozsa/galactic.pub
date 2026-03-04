import {Component, ElementRef, inject, Input, viewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {Voting} from '../../../services/responses';
import {getVotingStatus, getVotingStatusText, VotingStatus} from '../../../pages/voting/voting-utils';
import {RouterLink} from '@angular/router';
import {CastVoteService} from '../../../services/cast-vote.service';
import {CastVoteComponent} from '../../cast-vote/cast-vote.component';

@Component({
  selector: 'app-view-voting-basic-data',
  imports: [
    NgIf,
    CastVoteComponent
  ],
  templateUrl: './view-voting-basic-data.component.html',
  styleUrl: './view-voting-basic-data.component.css'
})
export class ViewVotingBasicDataComponent {
  @Input()
  voting!: Voting;

  castVoteService = inject(CastVoteService);

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

  onVoteClick() {
    this.castVoteService.voting = this.voting;
    this.castVoteService.initiated.next();
  }
}

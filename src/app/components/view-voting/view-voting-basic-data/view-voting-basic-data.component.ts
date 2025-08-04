import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Voting} from '../../../services/responses';

@Component({
  selector: 'app-view-voting-basic-data',
  imports: [
    NgIf
  ],
  templateUrl: './view-voting-basic-data.component.html',
  styleUrl: './view-voting-basic-data.component.css'
})
export class ViewVotingBasicDataComponent {
  @Input()
  voting!: Voting;

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
}

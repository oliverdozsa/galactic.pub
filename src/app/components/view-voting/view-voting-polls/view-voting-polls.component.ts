import {Component, Input} from '@angular/core';
import {Voting} from '../../../services/responses';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-view-voting-polls',
  imports: [
    NgForOf
  ],
  templateUrl: './view-voting-polls.component.html',
  styleUrl: './view-voting-polls.component.css'
})
export class ViewVotingPollsComponent {
  @Input()
  voting!: Voting;
}

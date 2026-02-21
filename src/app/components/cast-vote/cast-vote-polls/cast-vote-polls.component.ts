import {Component, Input} from '@angular/core';
import {Voting} from '../../../services/responses';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-cast-vote-polls',
  imports: [
    NgForOf
  ],
  templateUrl: './cast-vote-polls.component.html',
  styleUrl: './cast-vote-polls.component.css'
})
export class CastVotePollsComponent {
  @Input()
  voting!: Voting;
}

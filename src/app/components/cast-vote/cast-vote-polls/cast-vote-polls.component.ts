import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Voting} from '../../../services/responses';
import {NgForOf, NgIf} from '@angular/common';
import {BallotType} from '../../create-voting/create-voting-request';
import {MultiPollComponent} from './multi-poll/multi-poll.component';
import {MultiChoiceComponent} from './multi-choice/multi-choice.component';
import {PollIndex, PollOptionCode} from '../../../services/cast-vote.service';

@Component({
  selector: 'app-cast-vote-polls',
  imports: [
    NgForOf,
    NgIf,
    MultiPollComponent,
    MultiChoiceComponent
  ],
  templateUrl: './cast-vote-polls.component.html',
  styleUrl: './cast-vote-polls.component.css'
})
export class CastVotePollsComponent {
  BallotType = BallotType;

  @Input()
  voting!: Voting;

  @Output()
  choicesChanged = new EventEmitter<Map<PollIndex, Set<PollOptionCode>>>();

  private choices = new Map<PollIndex, Set<PollOptionCode>>();

  onSingleChoiceChange(index: PollIndex, choice: PollOptionCode) {
    this.onMultipleChoicesChanged(index, new Set<PollIndex>([choice]));
  }

  onMultipleChoicesChanged(index: PollIndex, choices: Set<PollIndex>) {
    this.choices.set(index, choices);
    this.choicesChanged.emit(this.choices);
  }
}

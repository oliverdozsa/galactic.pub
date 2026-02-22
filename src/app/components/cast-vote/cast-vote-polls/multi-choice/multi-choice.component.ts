import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VotingPoll} from '../../../../services/responses';
import {NgForOf} from '@angular/common';
import {PollIndex, PollOptionCode} from '../../../../services/cast-vote.service';

@Component({
  selector: 'app-multi-choice',
  imports: [
    NgForOf
  ],
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.css'
})
export class MultiChoiceComponent {
  @Input()
  poll!: VotingPoll;

  @Output()
  choicesChanged = new EventEmitter<Set<PollOptionCode>>();
}

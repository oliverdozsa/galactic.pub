import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VotingPoll} from '../../../../services/responses';
import {NgForOf} from '@angular/common';
import {PollOptionCode} from '../../../../services/cast-vote.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-multi-poll',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './multi-poll.component.html',
  styleUrl: './multi-poll.component.css'
})
export class MultiPollComponent {
  @Input()
  poll!: VotingPoll;

  _choice!: PollOptionCode;

  get choice(): PollOptionCode {
    return this._choice;
  }

  set choice(value: PollOptionCode) {
    this._choice = value;
    this.choiceChanged.emit(this._choice);
  }

  @Output()
  choiceChanged = new EventEmitter<PollOptionCode>();
}

import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {VotingPoll} from '../../../../services/responses';
import {NgForOf} from '@angular/common';
import {CastVoteService, PollOptionCode} from '../../../../services/cast-vote.service';
import {FormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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

  @Output()
  choiceChanged = new EventEmitter<PollOptionCode>();

  castVoteService = inject(CastVoteService);

  _choice: PollOptionCode | undefined;

  get choice(): PollOptionCode | undefined {
    return this._choice;
  }

  set choice(value: PollOptionCode) {
    this._choice = value;
    this.choiceChanged.emit(this._choice);
  }

  constructor() {
    this.castVoteService.castVoteStarted.pipe(takeUntilDestroyed())
      .subscribe({
        next: () => this.castVoteStarted()
      });
  }

  private castVoteStarted() {
    this._choice = undefined;
  }
}

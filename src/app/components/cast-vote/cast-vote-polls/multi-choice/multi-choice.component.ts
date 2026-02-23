import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {VotingPoll, VotingPollOption} from '../../../../services/responses';
import {NgForOf} from '@angular/common';
import {CastVoteService, PollIndex, PollOptionCode} from '../../../../services/cast-vote.service';
import {FormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-multi-choice',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.css'
})
export class MultiChoiceComponent {
  @Input()
  poll!: VotingPoll;

  checkedOptions = new Set<PollOptionCode>();

  @Output()
  choicesChanged = new EventEmitter<Set<PollOptionCode>>();

  castVoteService = inject(CastVoteService);

  constructor() {
    this.castVoteService.castVoteStarted.pipe(takeUntilDestroyed())
      .subscribe({
        next: () => this.castVoteStarted()
      });
  }

  isChecked(option: VotingPollOption) {
    return this.checkedOptions.has(option.code);
  }

  checkToggle(option: VotingPollOption) {
    if (this.checkedOptions.has(option.code)) {
      this.checkedOptions.delete(option.code)
    } else {
      this.checkedOptions.add(option.code);
    }

    this.choicesChanged.emit(this.checkedOptions);
  }

  private castVoteStarted() {
    this.checkedOptions.clear();
  }
}

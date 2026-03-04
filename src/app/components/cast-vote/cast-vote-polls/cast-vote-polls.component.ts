import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Voting, VotingPoll} from '../../../services/responses';
import {NgForOf, NgIf} from '@angular/common';
import {BallotType} from '../../create-voting/create-voting-request';
import {MultiPollComponent} from './multi-poll/multi-poll.component';
import {MultiChoiceComponent} from './multi-choice/multi-choice.component';
import {CastVoteService, PollIndex, PollOptionCode} from '../../../services/cast-vote.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NgxSpinnerService} from 'ngx-spinner';

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

  castVoteService = inject(CastVoteService);

  constructor() {
    this.castVoteService.initiated.pipe(takeUntilDestroyed())
      .subscribe({
        next: () => this.onInitiated()
      });
  }

  private choices = new Map<PollIndex, Set<PollOptionCode>>();

  onSingleChoiceChange(index: PollIndex, choice: PollOptionCode) {
    this.onMultipleChoicesChanged(index, new Set<PollIndex>([choice]));
  }

  onMultipleChoicesChanged(index: PollIndex, choices: Set<PollIndex>) {
    this.choices.set(index, choices);
    this.choicesChanged.emit(this.choices);
  }

  isChoiceValidFor(poll: VotingPoll) {
    if(!this.choices.has(poll.index)) {
      return false;
    }

    let isNumberOfChoicesValid = true;
    if(this.voting.ballotType == BallotType.MultiChoice) {
      isNumberOfChoicesValid = this.choices.get(poll.index)!.size <= this.voting.maxChoices;
    }

    return this.choices.get(poll.index)!.size > 0 && isNumberOfChoicesValid;
  }

  areAllChoicesValid() {
    return this.voting.polls.every(poll => this.isChoiceValidFor(poll));
  }

  onVoteClicked() {
    this.castVoteService.castVote();
  }

  private onInitiated() {
    this.choices.clear();
  }
}

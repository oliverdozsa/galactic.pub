import {Component, ElementRef, inject, viewChild} from '@angular/core';
import {CastVoteService, PollIndex, PollOptionCode} from '../../services/cast-vote.service';
import {Voting} from '../../services/responses';
import {JsonPipe, NgIf} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CastVotePollsComponent} from './cast-vote-polls/cast-vote-polls.component';

@Component({
  selector: 'app-cast-vote',
  imports: [
    NgIf,
    CastVotePollsComponent,
    JsonPipe
  ],
  templateUrl: './cast-vote.component.html',
  styleUrl: './cast-vote.component.css'
})
export class CastVoteComponent {
  castVoteService = inject(CastVoteService);

  choices = new Map<PollIndex, Set<PollOptionCode>>

  dialog = viewChild<ElementRef<HTMLDialogElement>>("castVoteDialog");

  get voting(): Voting {
    return this.castVoteService.voting;
  }

  constructor() {
    this.castVoteService.castVoteStarted.pipe(takeUntilDestroyed())
      .subscribe({
        next: () => this.castVoteStarted()
      });
  }

  onChoicesChanged(choices: Map<PollIndex, Set<PollOptionCode>>) {
    this.choices = choices;
  }

  private castVoteStarted() {
    this.dialog()?.nativeElement.showModal();
  }
}

import {Component, Input} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';
import {CreatePollRequest} from '../create-poll-request';
import {NgForOf} from '@angular/common';
import {CreateVotingQuestionComponent} from './create-voting-question/create-voting-question.component';

@Component({
  selector: 'app-create-voting-polls',
  imports: [
    NgForOf,
    CreateVotingQuestionComponent
  ],
  templateUrl: './create-voting-polls.component.html',
  styleUrl: './create-voting-polls.component.css'
})
export class CreateVotingPollsComponent {
  @Input()
  votingRequest!: CreateVotingRequest

  onAddQuestionClicked() {
    this.votingRequest.polls.push(new CreatePollRequest())
  }
}

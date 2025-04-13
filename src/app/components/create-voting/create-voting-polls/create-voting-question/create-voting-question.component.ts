import {Component, Input} from '@angular/core';
import {CreateVotingRequest} from '../../create-voting-request';
import {CreatePollRequest} from '../../create-poll-request';

@Component({
  selector: 'app-create-voting-question',
  imports: [],
  templateUrl: './create-voting-question.component.html',
  styleUrl: './create-voting-question.component.css'
})
export class CreateVotingQuestionComponent {
  @Input()
  pollRequest!: CreatePollRequest;
}

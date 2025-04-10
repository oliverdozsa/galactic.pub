import {Component, Input} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';

@Component({
  selector: 'app-create-voting-polls',
  imports: [],
  templateUrl: './create-voting-polls.component.html',
  styleUrl: './create-voting-polls.component.css'
})
export class CreateVotingPollsComponent {
  @Input()
  votingRequest!: CreateVotingRequest
}

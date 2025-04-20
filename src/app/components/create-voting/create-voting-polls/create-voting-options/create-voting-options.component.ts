import {Component, Input} from '@angular/core';
import {CreatePollRequest} from '../../create-poll-request';

@Component({
  selector: 'app-create-voting-options',
  imports: [],
  templateUrl: './create-voting-options.component.html',
  styleUrl: './create-voting-options.component.css'
})
export class CreateVotingOptionsComponent {
  @Input()
  pollRequest!: CreatePollRequest;
}

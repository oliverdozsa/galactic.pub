import {Component, Input} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';

@Component({
  selector: 'app-create-voting-participants',
  imports: [],
  templateUrl: './create-voting-participants.component.html',
  styleUrl: './create-voting-participants.component.css'
})
export class CreateVotingParticipantsComponent {
  @Input()
  votingRequest!: CreateVotingRequest;
}

import {Component, Input} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';

@Component({
  selector: 'app-create-voting-basic-data',
  imports: [],
  templateUrl: './create-voting-basic-data.component.html',
  styleUrl: './create-voting-basic-data.component.css'
})
export class CreateVotingBasicDataComponent {
  @Input()
  votingRequest!: CreateVotingRequest;
}

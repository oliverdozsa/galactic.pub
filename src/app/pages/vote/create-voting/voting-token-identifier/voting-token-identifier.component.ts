import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-voting-token-identifier',
  templateUrl: './voting-token-identifier.component.html',
  styleUrls: ['./voting-token-identifier.component.scss']
})
export class VotingTokenIdentifierComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();
}

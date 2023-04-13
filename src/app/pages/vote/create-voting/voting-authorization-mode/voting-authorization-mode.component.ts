import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";
import {Visibility} from "../../../../create-voting/visibility";

@Component({
  selector: 'app-voting-authorization-mode',
  templateUrl: './voting-authorization-mode.component.html',
  styleUrls: ['./voting-authorization-mode.component.scss']
})
export class VotingAuthorizationModeComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();
  protected readonly Visibility = Visibility;
}

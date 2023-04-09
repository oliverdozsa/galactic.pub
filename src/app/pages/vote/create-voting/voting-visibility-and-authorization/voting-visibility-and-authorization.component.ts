import {Component, Input} from '@angular/core';
import { Visibility } from 'src/app/create-voting/visibility';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";
import {Authorization} from "../../../../create-voting/authorization";

@Component({
  selector: 'app-voting-visibility-and-authorization',
  templateUrl: './voting-visibility-and-authorization.component.html',
  styleUrls: ['./voting-visibility-and-authorization.component.scss']
})
export class VotingVisibilityAndAuthorizationComponent {
  Visibility = Visibility;
  Authorization = Authorization;

  @Input()
  form: CreateVotingForm = new CreateVotingForm();
}

import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-voting-description',
  templateUrl: './voting-description.component.html',
  styleUrls: ['./voting-description.component.scss']
})
export class VotingDescriptionComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();
}

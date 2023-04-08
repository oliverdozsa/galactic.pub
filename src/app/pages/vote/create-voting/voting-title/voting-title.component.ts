import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-voting-title',
  templateUrl: './voting-title.component.html',
  styleUrls: ['./voting-title.component.scss']
})
export class VotingTitleComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();
}

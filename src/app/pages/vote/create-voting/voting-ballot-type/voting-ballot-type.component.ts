import {Component, Input} from '@angular/core';
import { BallotType } from 'src/app/create-voting/ballot-type';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";
import {MaxVotingQuestionsOrChoices} from "../../../../create-voting/account/max-voting-questions-or-choices";
import {Visibility} from "../../../../create-voting/visibility";

@Component({
  selector: 'app-voting-ballot-type',
  templateUrl: './voting-ballot-type.component.html',
  styleUrls: ['./voting-ballot-type.component.scss']
})
export class VotingBallotTypeComponent {
  BallotType = BallotType;

  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  private _maxPossible: MaxVotingQuestionsOrChoices = new MaxVotingQuestionsOrChoices();

  get maxPossible(): number {
    return this._maxPossible.determine(this.form);
  }

    protected readonly Visibility = Visibility;
}

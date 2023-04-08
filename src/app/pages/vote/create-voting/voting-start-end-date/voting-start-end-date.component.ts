import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-voting-start-end-date',
  templateUrl: './voting-start-end-date.component.html',
  styleUrls: ['./voting-start-end-date.component.scss']
})
export class VotingStartEndDateComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  set startDateRaw(value: string) {
    this._startDateRaw = value;
    this.form.startDate = new Date(Date.parse(this._startDateRaw));
  }

  get startDateRaw():string{
    return this._startDateRaw;
  }

  private _startDateRaw: string = "";

  set endDateRaw(value: string) {
    this._endDateRaw = value;
    this.form.endDate = new Date(Date.parse(this._endDateRaw));
  }

  get endDateRaw():string{
    return this._endDateRaw;
  }

  private _endDateRaw: string = "";
}

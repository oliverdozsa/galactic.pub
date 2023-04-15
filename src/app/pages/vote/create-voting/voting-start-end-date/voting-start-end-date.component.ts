import {Component, Input, OnInit} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-voting-start-end-date',
  templateUrl: './voting-start-end-date.component.html',
  styleUrls: ['./voting-start-end-date.component.scss']
})
export class VotingStartEndDateComponent implements OnInit {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  set startDateRaw(value: string) {
    this._startDateRaw = value;
    this.form.startDate = new Date(Date.parse(this._startDateRaw));
  }

  get startDateRaw(): string {
    return this._startDateRaw;
  }

  private _startDateRaw: string = "";

  set endDateRaw(value: string) {
    this._endDateRaw = value;
    this.form.endDate = new Date(Date.parse(this._endDateRaw));
  }

  get endDateRaw(): string {
    return this._endDateRaw;
  }

  private _endDateRaw: string = "";
  private static TimeZoneOffset = new Date().getTimezoneOffset() * 60000;

  ngOnInit(): void {
    if (this.form.startDate) {
      const startDateWithOffset = this.form.startDate.valueOf() - VotingStartEndDateComponent.TimeZoneOffset;
      this.startDateRaw = new Date(startDateWithOffset).toISOString().slice(0, 16);
    }

    if (this.form.endDate) {
      const endDateWithOffset = this.form.endDate.valueOf() - VotingStartEndDateComponent.TimeZoneOffset;
      this.endDateRaw = new Date(endDateWithOffset).toISOString().slice(0, 16);
    }
  }
}

import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-funding-account-balance',
  templateUrl: './funding-account-balance.component.html',
  styleUrls: ['./funding-account-balance.component.scss']
})
export class FundingAccountBalanceComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();
}

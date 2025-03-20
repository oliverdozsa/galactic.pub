import { Component } from '@angular/core';
import {TokenIdComponent} from './token-id/token-id.component';
import {FundingAccountComponent} from './funding-account/funding-account.component';

@Component({
  selector: 'app-create-voting-technical-data',
  imports: [
    TokenIdComponent,
    FundingAccountComponent
  ],
  templateUrl: './create-voting-technical-data.component.html',
  styleUrl: './create-voting-technical-data.component.css'
})
export class CreateVotingTechnicalDataComponent {

}

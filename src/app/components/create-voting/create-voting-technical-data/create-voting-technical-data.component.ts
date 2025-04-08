import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TokenIdComponent} from './token-id/token-id.component';
import {FundingAccountComponent} from './funding-account/funding-account.component';
import {CreateVotingRequest} from '../create-voting-request';

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
  @Input()
  votingRequest!: CreateVotingRequest;

  @Output()
  isValidChange = new EventEmitter<boolean>;

  private isTokenIdValid = false;
  private isFundingAccountValid = false;

  private get isAllValid() {
    return this.isTokenIdValid && this.isFundingAccountValid;
  }

  onTokenIdValid(isValid: boolean) {
    this.isTokenIdValid = isValid;
    this.isValidChange.emit(this.isAllValid);
  }

  onFundingAccountValid(isValid: boolean) {
    this.isFundingAccountValid = isValid;
    this.isValidChange.emit(this.isAllValid);
  }
}

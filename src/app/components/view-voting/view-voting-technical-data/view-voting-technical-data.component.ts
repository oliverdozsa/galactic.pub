import {Component, Input} from '@angular/core';
import {Voting} from '../../../services/responses';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-view-voting-technical-data',
  imports: [
    NgIf
  ],
  templateUrl: './view-voting-technical-data.component.html',
  styleUrl: './view-voting-technical-data.component.css'
})
export class ViewVotingTechnicalDataComponent {
  @Input()
  voting!: Voting;

  getStellarChainBaseUrl(voting: Voting) {
    return `https://${voting.isOnTestNetwork ? "testnet." : ""}stellarchain.io`;
  }

  truncateAccountId(accountId: string) {
    return accountId.slice(0, 10) + "...";
  }
}

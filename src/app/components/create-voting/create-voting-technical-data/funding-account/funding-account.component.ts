import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {CreateVotingRequest} from '../../create-voting-request';

@Component({
  selector: 'app-funding-account',
  imports: [
    NgIf
  ],
  templateUrl: './funding-account.component.html',
  styleUrl: './funding-account.component.css'
})
export class FundingAccountComponent {
  @Input()
  votingRequest!: CreateVotingRequest;

  isValid = false;
}

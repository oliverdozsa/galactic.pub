import {Component, inject, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {CreateVotingRequest} from '../../create-voting-request';
import {FormsModule} from '@angular/forms';
import {StellarService} from '../../../../services/stellar.service';

@Component({
  selector: 'app-funding-account',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './funding-account.component.html',
  styleUrl: './funding-account.component.css'
})
export class FundingAccountComponent {
  @Input()
  votingRequest!: CreateVotingRequest;

  isValid = false;
  isGenerating = false;

  stellarService = inject(StellarService);

  get estimatedCost() {
    return this.votingRequest.maxVoters * 4 + 110;
  }

  get isOnTestNet() {
    return this.votingRequest.useTestNet;
  }

  set isOnTestNet(value: boolean) {
    this.votingRequest.useTestNet = value;
  }

  get accountSecret(): string {
    return this.votingRequest.fundingAccountSecret;
  }

  set accountSecret(value: string) {
    this.votingRequest.fundingAccountSecret = value;
    this.checkIfValid();
  }

  private checkIfValid() {
    // TODO
  }

  onGenerateClicked() {
    this.isGenerating = true;
    this.stellarService.generateTestAccount().subscribe({
      next: s => this.accountSecret = s,
      error: () => this.isGenerating = false,
      complete: () => this.isGenerating = false
    });
  }
}

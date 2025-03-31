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
export class FundingAccountComponent implements OnInit {
  @Input()
  votingRequest!: CreateVotingRequest;

  isValid = false;
  isGenerating = false;
  isLoadingBalance = false;

  stellarService = inject(StellarService);

  balance = "";

  get estimatedCost() {
    return this.votingRequest.maxVoters * 4 + 110;
  }

  get isOnTestNet() {
    return this.votingRequest.useTestNet;
  }

  set isOnTestNet(value: boolean) {
    this.votingRequest.useTestNet = value;
    this.setNet();
  }

  get accountSecret(): string {
    return this.votingRequest.fundingAccountSecret;
  }

  set accountSecret(value: string) {
    this.votingRequest.fundingAccountSecret = value;
    this.checkIfValid();
  }

  ngOnInit(): void {
    this.setNet();
  }

  onGenerateClicked() {
    this.isGenerating = true;
    this.stellarService.generateTestAccount().subscribe({
      next: s => this.accountSecret = s,
      error: () => this.isGenerating = false,
      complete: () => this.isGenerating = false
    });
  }

  private checkIfValid() {
    this.isValid = this.stellarService.isAccountSecretValid(this.accountSecret);
    // TODO: isValid should consider the net used.
    if (this.isValid) {
      this.queryBalance();
    }
  }

  private setNet() {
    if (this.votingRequest.useTestNet) {
      this.stellarService.useTestNet();
    } else {
      this.stellarService.useMainNet();
    }

    this.checkIfValid();
  }

  private queryBalance() {
    this.isLoadingBalance = true;
    const accountId = this.stellarService.publicFromSecret(this.accountSecret);
    this.stellarService.getBalanceOf(accountId).subscribe({
      next: b => this.onBalanceQueried(b),
      error: () => this.isLoadingBalance = false
    });
  }

  private onBalanceQueried(balance: string) {
    const formattedBalance = Number.parseFloat(balance).toLocaleString("en-US");
    this.balance = formattedBalance;
    this.isLoadingBalance = false;
  }
}

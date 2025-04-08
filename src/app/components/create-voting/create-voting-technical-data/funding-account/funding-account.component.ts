import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
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

  @Output()
  isValidChange = new EventEmitter<boolean>();

  stellarService = inject(StellarService);

  isGenerating = false;
  isLoadingBalance = false;
  balance = "";
  balanceAsNumber: number = -1;

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

  get fundingAccountValidationMessage() {
    if (!this.isFundingAccountTechnicallyValid) {
      return "Funding account secret is not valid.";
    } else if (!this.doesAccountExist) {
      return "Account doesn't exist.";
    } else if (this.isBalanceInsufficient) {
      return "Insufficient funds. See estimated cost below."
    }

    return "";
  }

  get isValid() {
    return this.isFundingAccountTechnicallyValid && this.doesAccountExist && !this.isBalanceInsufficient;
  }

  private get isFundingAccountTechnicallyValid() {
    return this.stellarService.isAccountSecretValid(this.accountSecret);
  }

  private get isBalanceInsufficient() {
    return this.balanceAsNumber < this.estimatedCost;
  }

  private doesAccountExist = false;

  ngOnInit(): void {
    this.isValidChange.emit(this.isValid);
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
    if (this.isFundingAccountTechnicallyValid) {
      this.queryBalanceForValidation();
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

  private queryBalanceForValidation() {
    this.isLoadingBalance = true;
    this.balanceAsNumber = -1;
    this.balance = "";
    this.doesAccountExist = false;
    const accountId = this.stellarService.publicFromSecret(this.accountSecret);
    this.stellarService.getBalanceOf(accountId).subscribe({
      next: b => this.onBalanceQueried(b),
      error: e => this.onBalanceError(e)
    });
  }

  private onBalanceQueried(balance: string) {
    this.balanceAsNumber = Number.parseFloat(balance);
    this.balance = this.balanceAsNumber.toLocaleString("en-US");
    this.isLoadingBalance = false;
    this.doesAccountExist = true;

    this.isValidChange.emit(this.isValid);
  }

  private onBalanceError(e: any) {
    this.isLoadingBalance = false;
    this.balanceAsNumber = -1;
    this.balance = "";
    if (e.response.status == 404) {
      this.doesAccountExist = false;
    }

    this.isValidChange.emit(this.isValid);
  }
}

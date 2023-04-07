import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";
import {TestAccountGenerator} from "../../../../create-voting/account/test-account-generator/test-account-generator";
import {HttpClient} from "@angular/common/http";
import {finalize} from "rxjs";
import {AppKeyPair} from "../../../../create-voting/account/app-key-pair";

@Component({
  selector: 'app-funding-account-source',
  templateUrl: './funding-account-source.component.html',
  styleUrls: ['./funding-account-source.component.scss']
})
export class FundingAccountSourceComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  private testAccountGenerator: TestAccountGenerator;

  constructor(httpClient: HttpClient) {
    this.testAccountGenerator = new TestAccountGenerator("", httpClient)
  }

  onGenerateFundingAccountClicked() {
    this.testAccountGenerator.network = this.form.selectedNetwork;

    this.form.isGeneratingFundingAccount = true;
    this.testAccountGenerator.generate()
      .pipe(
        finalize(() => this.form.isGeneratingFundingAccount = false)
      )
      .subscribe({
        next: k => this.onTestAccountGenerated(k),
        error: e => this.onTestAccountGenerationFailed(e)
      });
  }

  private onTestAccountGenerated(keyPair: AppKeyPair) {
    this.form.fundingAccountPublic = keyPair.publicKey;
    this.form.fundingAccountSecret = keyPair.secretKey;
    this.form.isGeneratingFundingAccount = false;
  }

  private onTestAccountGenerationFailed(e: any) {
    console.warn(`Failed to generate test account:${JSON.stringify(e)}`);
    // TODO: toast about failed to generate funding account.
  }
}

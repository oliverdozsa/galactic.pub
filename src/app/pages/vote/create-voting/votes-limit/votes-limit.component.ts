import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-votes-limit',
  templateUrl: './votes-limit.component.html',
  styleUrls: ['./votes-limit.component.scss']
})
export class VotesLimitComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  get shouldWarn(): boolean {
    return this.shouldWarnDueToBalance() || this.shouldWarnDueToMax() || this.shouldWarnDueTooSmallValue();
  }

  get errorText() {
    if (this.shouldWarnDueToBalance() && !this.shouldWarnDueToMax()) {
      return `Not enough balance for chosen votes cap! The maximum possible with this balance is ${this.calculateMaxPossibleVotesCap()}.`;
    }

    if(this.shouldWarnDueTooSmallValue()) {
      return "Votes cap must be > 1!";
    }

    return `The maximum number of votes is limited to ${environment.maxVotesLimit.toLocaleString()}.`;
  }

  get max() {
    return environment.maxVotesLimit;
  }

  private calculateMaxPossibleVotesCap(): number | undefined {
    if (!this.form.fundingAccountBalance.isNotFound && this.form.fundingAccountBalance.value != -1) {
      return this.form.votesUpperLimit.calculate();
    }

    return undefined;
  }

  private shouldWarnDueToBalance() {
    const maxPossibleVotesCap = this.calculateMaxPossibleVotesCap();
    return maxPossibleVotesCap != undefined &&
      this.form.votesLimit != undefined &&
      (maxPossibleVotesCap < this.form.votesLimit);
  }

  private shouldWarnDueToMax() {
    if (this.form.votesLimit == undefined) {
      return false;
    }

    return this.form.votesLimit > this.max;
  }

  private shouldWarnDueTooSmallValue() {
    return this.form.votesLimit == undefined ||
      (this.form.votesLimit < 2);
  }
}

import {Component, Input} from '@angular/core';
import {Voting} from "../../../../../data/voting";

@Component({
  selector: 'app-display-account',
  templateUrl: './display-account.component.html',
  styleUrls: ['./display-account.component.scss']
})
export class DisplayAccountComponent {
  @Input()
  accountId: string | undefined = "";

  @Input()
  voting: Voting = new Voting();

  @Input()
  title: string = "";

  get truncatedOrUnavailable(): string {
    if(this.accountId) {
      return this.accountId.length > 10 ? this.accountId.slice(0, 10) + "..." : this.accountId;
    }

    return "<NOT AVAILABLE YET>";
  }

  get link(): string{
    if(this.voting.network == "stellar") {
      return `https://${this.voting.isOnTestNetwork ?  "testnet." : ""}lumenscan.io/account/${this.accountId}`;
    }

    return "";
  }
}

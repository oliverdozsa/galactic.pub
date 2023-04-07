import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-select-network',
  templateUrl: './select-network.component.html',
  styleUrls: ['./select-network.component.scss']
})
export class SelectNetworkComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  get selectedNetwork() {
    return this.form!.selectedNetwork
  }

  set selectedNetwork(value: string) {
    this.form!.selectedNetwork = value;
  }

  get isValid() {
    return this.form.selectedNetwork != "";
  }
}

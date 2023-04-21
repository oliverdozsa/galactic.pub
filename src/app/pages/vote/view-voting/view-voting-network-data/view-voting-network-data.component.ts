import {Component, Input} from '@angular/core';
import {Voting} from "../../../../data/voting";

@Component({
  selector: 'app-view-voting-network-data',
  templateUrl: './view-voting-network-data.component.html',
  styleUrls: ['./view-voting-network-data.component.scss']
})
export class ViewVotingNetworkDataComponent {
  @Input()
  voting: Voting = new Voting();
}

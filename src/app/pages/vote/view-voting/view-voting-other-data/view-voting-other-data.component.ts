import {Component, Input} from '@angular/core';
import {Voting} from "../../../../data/voting";

@Component({
  selector: 'app-view-voting-other-data',
  templateUrl: './view-voting-other-data.component.html',
  styleUrls: ['./view-voting-other-data.component.scss']
})
export class ViewVotingOtherDataComponent {
  @Input()
  voting: Voting = new Voting();
}

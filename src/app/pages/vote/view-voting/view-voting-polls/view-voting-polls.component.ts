import {Component, Input} from '@angular/core';
import {Voting} from "../../../../data/voting";

@Component({
  selector: 'app-view-voting-polls',
  templateUrl: './view-voting-polls.component.html',
  styleUrls: ['./view-voting-polls.component.scss']
})
export class ViewVotingPollsComponent {
  @Input()
  voting: Voting = new Voting();
}

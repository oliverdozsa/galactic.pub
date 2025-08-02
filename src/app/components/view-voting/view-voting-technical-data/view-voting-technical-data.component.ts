import {Component, Input} from '@angular/core';
import {Voting} from '../../../services/responses';

@Component({
  selector: 'app-view-voting-technical-data',
  imports: [],
  templateUrl: './view-voting-technical-data.component.html',
  styleUrl: './view-voting-technical-data.component.css'
})
export class ViewVotingTechnicalDataComponent {
  @Input()
  voting!: Voting;
}

import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Voting} from '../../../services/responses';

@Component({
  selector: 'app-view-voting-basic-data',
  imports: [
    NgIf
  ],
  templateUrl: './view-voting-basic-data.component.html',
  styleUrl: './view-voting-basic-data.component.css'
})
export class ViewVotingBasicDataComponent {
  @Input()
  voting!: Voting;

  toLocaleDateTime(dateString: string) {
    const date = new Date(Date.parse(dateString));
    return date.toLocaleString();
  }
}

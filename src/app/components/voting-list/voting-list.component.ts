import {Component, Input} from '@angular/core';
import {Voting} from '../../services/responses';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-voting-list',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './voting-list.component.html',
  styleUrl: './voting-list.component.css'
})
export class VotingListComponent {
  @Input()
  votings: Voting[] = [];

  @Input()
  isLoading: boolean = true;
}

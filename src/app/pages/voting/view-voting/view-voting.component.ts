import {Component, inject, Input, OnInit} from '@angular/core';
import {VotingService} from '../../../services/voting.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-view-voting',
  imports: [],
  templateUrl: './view-voting.component.html',
  styleUrl: './view-voting.component.css'
})
export class ViewVotingComponent implements OnInit {
  @Input()
  votingId: number;

  votingService = inject(VotingService);
  spinnerService = inject(NgxSpinnerService);
  isLoading = true;

  ngOnInit(): void {

  }
}

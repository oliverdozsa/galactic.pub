import {Component, inject, Input} from '@angular/core';
import {Voting} from '../../services/responses';
import {NgForOf, NgIf} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';

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
  set isLoading(value: boolean) {
    if(value) {
      this.spinnerService.show();
    } else {
      this.spinnerService.hide();
    }
  };

  spinnerService = inject(NgxSpinnerService);
}

import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {Voting} from '../../services/responses';
import {NgForOf, NgIf} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {RouterLink} from '@angular/router';
import {VotingService} from '../../services/voting.service';
import {ToastsService} from '../../services/toasts.service';
import {DeleteVoting} from './delete-voting';

@Component({
  selector: 'app-voting-list',
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './voting-list.component.html',
  styleUrl: './voting-list.component.css'
})
export class VotingListComponent implements OnInit {
  @Input()
  votings: Voting[] = [];

  @Input()
  hideDelete: boolean = false;

  @Input()
  set isLoading(value: boolean) {
    this._isLoading = value;

    if(this.isLoading) {
      this.spinnerService.show();
    } else {
      this.spinnerService.hide();
    }
  };

  @ViewChild("votingsDeleteModal")
  deleteModal!: ElementRef;

  votingService = inject(VotingService);
  spinnerService = inject(NgxSpinnerService);
  toastsService = inject(ToastsService);
  deleteVoting!: DeleteVoting;

  ngOnInit(): void {
    this.deleteVoting = new DeleteVoting(this);
  }


  get isLoading(): boolean {
    return this._isLoading
  }

  private _isLoading = false;
}

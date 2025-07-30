import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {Voting} from '../../services/responses';
import {NgForOf, NgIf} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {RouterLink} from '@angular/router';

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
export class VotingListComponent {
  @Input()
  votings: Voting[] = [];

  @Input()
  set isLoading(value: boolean) {
    this._isLoading = value;

    if(this.isLoading) {
      this.spinnerService.show();
    } else {
      this.spinnerService.hide();
    }
  };

  get isLoading(): boolean {
    return this._isLoading
  }

  @ViewChild("votingsViewerModal")
  viewModal: ElementRef | undefined;

  @ViewChild("votingsDeleteModal")
  deleteModal: ElementRef | undefined;

  openedVoting: Voting | undefined = undefined;

  private _isLoading = false;

  spinnerService = inject(NgxSpinnerService);

  onOpenClicked(i: number) {
    this.openedVoting = this.votings[i];
    this.viewModal?.nativeElement.showModal();
  }

  onDeleteClicked(i: number) {
    this.openedVoting = this.votings[i];
    this.viewModal?.nativeElement.showModal();
  }
}

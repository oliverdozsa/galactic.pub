import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-create-voting-participants',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './create-voting-participants.component.html',
  styleUrl: './create-voting-participants.component.css'
})
export class CreateVotingParticipantsComponent {
  @Input()
  votingRequest!: CreateVotingRequest;

  @Output()
  isValidChange = new EventEmitter<boolean>();

  participants: string[] = [];

  emailInput = "";

  private emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  get isEmailValid() {
    return this.emailRegex.test(this.emailInput);
  }

  onAddEvent() {
    if (this.isEmailValid) {
      this.participants.push(this.emailInput)
      this.emailInput = "";
      this.isValidChange.emit(true);
    }
  }

  onDelete(index: number) {
    this.participants.splice(index, 1);

    if (this.participants.length == 0) {
      this.isValidChange.emit(false);
    }
  }
}

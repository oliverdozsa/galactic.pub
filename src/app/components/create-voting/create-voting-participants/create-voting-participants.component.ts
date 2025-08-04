import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-create-voting-participants',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './create-voting-participants.component.html',
  styleUrl: './create-voting-participants.component.css'
})
export class CreateVotingParticipantsComponent {
  @Input()
  votingRequest!: CreateVotingRequest;

  @Output()
  participantsChange = new EventEmitter<string[]>();

  participants: string[] = [];

  emailInput = "";

  private emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  get isEmailValid() {
    return this.emailRegex.test(this.emailInput) && !this.isEmailAlreadyAdded;
  }

  get isMaxVotersReached() {
    return this.participants.length >= this.votingRequest.maxVoters;
  }

  get isEmailAlreadyAdded() {
    return this.participants.find(e => e == this.emailInput) != undefined;
  }

  onAddEvent() {
    if (this.isEmailValid) {
      this.participants.push(this.emailInput)
      this.emailInput = "";
      this.participantsChange.emit(this.participants);
    }
  }

  onDelete(index: number) {
    this.participants.splice(index, 1);
    this.participantsChange.emit(this.participants);
  }
}

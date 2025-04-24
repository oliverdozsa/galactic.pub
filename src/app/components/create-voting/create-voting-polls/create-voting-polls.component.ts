import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BallotType, CreateVotingRequest} from '../create-voting-request';
import {CreatePollRequest} from '../create-poll-request';
import {NgForOf, NgIf} from '@angular/common';
import {CreateVotingQuestionComponent} from './create-voting-question/create-voting-question.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-voting-polls',
  imports: [
    NgForOf,
    CreateVotingQuestionComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './create-voting-polls.component.html',
  styleUrl: './create-voting-polls.component.css'
})
export class CreateVotingPollsComponent {
  BallotType= BallotType;

  @Input()
  votingRequest!: CreateVotingRequest

  @Output()
  isValidChange = new EventEmitter<boolean>;

  private pollValidations: boolean[] = [];

  onAddQuestionClicked() {
    this.votingRequest.polls.push(new CreatePollRequest())
    this.pollValidations.push(false);
    this.checkIfAllPollsAreValid();
  }

  onPollValid(validEvent: { index: number, isValid: boolean }) {
    this.pollValidations[validEvent.index] = validEvent.isValid;
    this.checkIfAllPollsAreValid();
  }

  onQuestionDelete(index: number) {
    this.votingRequest.polls.splice(index, 1);
    this.pollValidations.splice(index, 1);
    this.checkIfAllPollsAreValid();
  }

  private checkIfAllPollsAreValid() {
    if (this.votingRequest.polls.length == 0) {
      this.isValidChange.emit(false);
    } else {
      const areAllValid = this.pollValidations.reduce((prev, current) => prev && current);
      this.isValidChange.emit(areAllValid);
    }
  }
}

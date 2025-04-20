import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CreateVotingRequest} from '../../create-voting-request';
import {CreatePollRequest} from '../../create-poll-request';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CreateVotingOptionsComponent} from '../create-voting-options/create-voting-options.component';

@Component({
  selector: 'app-create-voting-question',
  imports: [
    NgIf,
    FormsModule,
    CreateVotingOptionsComponent
  ],
  templateUrl: './create-voting-question.component.html',
  styleUrl: './create-voting-question.component.css'
})
export class CreateVotingQuestionComponent {
  @Input()
  pollRequest!: CreatePollRequest;

  @Input()
  index = -1;

  @Output()
  allValidChange = new EventEmitter<{index: number, isValid: boolean}>();

  @Output()
  deleted = new EventEmitter<number>();

  get question() {
    return this.pollRequest.question;
  }

  set question(value) {
    this.pollRequest.question = value;
    this.checkIfAllValid();
  }

  get description() {
    return this.pollRequest.description;
  }

  set description(value) {
    this.pollRequest.description = value;
    this.checkIfAllValid();
  }

  get isQuestionValid() {
    const question = this.pollRequest.question;
    return question != undefined && question.length >= 2 && question.length <= 1000;
  }

  get isDescriptionValid() {
    const description = this.pollRequest.description;

    if (description) {
      return description.length <= 1000;
    }

    return true;
  }

  arePollOptionsValid = false;

  onQuestionDeleteClicked() {
    this.deleted.emit(this.index);
  }

  private checkIfAllValid() {
    const allValid = this.isQuestionValid && this.isDescriptionValid && this.arePollOptionsValid;
    this.allValidChange.emit({index: this.index, isValid: allValid});
  }
}

import {Component, Input} from '@angular/core';
import {CreateVotingRequest} from '../../create-voting-request';
import {CreatePollRequest} from '../../create-poll-request';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-voting-question',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './create-voting-question.component.html',
  styleUrl: './create-voting-question.component.css'
})
export class CreateVotingQuestionComponent {
  @Input()
  pollRequest!: CreatePollRequest;

  @Input()
  index = -1;

  get question() {
    return this.pollRequest.question;
  }

  set question(value) {
    this.pollRequest.question = value;
  }

  get description() {
    return this.pollRequest.description;
  }

  set description(value) {
    this.pollRequest.description = value;
  }

  get isQuestionValid() {
    const question = this.pollRequest.question;
    return question && question.length >= 2 && question.length <= 1000;
  }

  get isDescriptionValid() {
    const description = this.pollRequest.description;

    if (description) {
      return description.length <= 1000;
    }

    return true;
  }
}

import {Component, Input} from '@angular/core';
import {CreatePollRequest} from '../../create-poll-request';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CreatePollOptionRequest} from '../../create-poll-option-request';

@Component({
  selector: 'app-create-voting-options',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './create-voting-options.component.html',
  styleUrl: './create-voting-options.component.css'
})
export class CreateVotingOptionsComponent {
  @Input()
  pollRequest!: CreatePollRequest;

  onAddOptionClicked() {
    this.pollRequest.options.push({name: "", code: this.pollRequest.options.length + 1});
  }

  isOptionNameValid(option: CreatePollOptionRequest) {
    return option.name.length >= 2 && option.name.length <= 300;
  }
}

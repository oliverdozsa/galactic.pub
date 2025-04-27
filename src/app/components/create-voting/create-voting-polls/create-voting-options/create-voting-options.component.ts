import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output()
  allValidChange = new EventEmitter<boolean>();

  onAddOptionClicked() {
    this.pollRequest.options.push({name: "", code: this.pollRequest.options.length + 1});
    this.checkIfAllValid();
  }

  isOptionNameValid(option: CreatePollOptionRequest) {
    return option.name.length >= 2 && option.name.length <= 300;
  }

  onDeleteOptionClicked(index: number) {
    this.pollRequest.options.splice(index, 1);
    this.recalculateCodes();
    this.checkIfAllValid();
  }

  onNameChange() {
    this.checkIfAllValid();
  }

  private recalculateCodes() {
    for (let i = 1; i <= this.pollRequest.options.length; i++) {
      this.pollRequest.options[i - 1].code = i;
    }
  }

  private checkIfAllValid() {
    const options = this.pollRequest.options;

    if (options.length < 2) {
      this.allValidChange.emit(false)
    } else {
      const areAllValid = options
        .map(o => this.isOptionNameValid(o))
        .reduce((p, c) => p && c);
      this.allValidChange.emit(areAllValid);
    }
  }
}

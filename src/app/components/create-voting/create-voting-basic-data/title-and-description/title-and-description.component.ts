import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateVotingRequest} from '../../create-voting-request';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-title-and-description',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './title-and-description.component.html',
  styleUrl: './title-and-description.component.css'
})
export class TitleAndDescriptionComponent implements OnInit {
  @Input()
  votingRequest!: CreateVotingRequest

  @Output()
  allValidChange = new EventEmitter<boolean>();

  set title(value: string) {
    this.votingRequest.title = value;
    this.checkIfAllValid();
  }

  get title() {
    return this.votingRequest.title;
  }

  get isTitleValid() {
    return this.votingRequest.title != null &&
      this.votingRequest.title.length > 1 && this.votingRequest.title.length <= 1000;
  }

  set description(value: string) {
    this.votingRequest.description = value;
    this.checkIfAllValid();
  }

  get description() {
    return this.votingRequest.description;
  }

  get isDescriptionValid() {
    return this.votingRequest.description != null &&
      this.votingRequest.description.length > 1 && this.votingRequest.description.length <= 1000;
  }

  ngOnInit() {
    this.checkIfAllValid();
  }

  private checkIfAllValid() {
    this.allValidChange.emit(this.isTitleValid && this.isDescriptionValid);
  }
}

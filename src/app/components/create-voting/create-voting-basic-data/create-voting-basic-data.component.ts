import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TitleAndDescriptionComponent} from './title-and-description/title-and-description.component';
import {LimitationsComponent} from './limitations/limitations.component';
import {DatesComponent} from './dates/dates.component';

@Component({
  selector: 'app-create-voting-basic-data',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TitleAndDescriptionComponent,
    LimitationsComponent,
    DatesComponent
  ],
  templateUrl: './create-voting-basic-data.component.html',
  styleUrl: './create-voting-basic-data.component.css'
})
export class CreateVotingBasicDataComponent implements OnInit{
  @Input()
  votingRequest = new CreateVotingRequest();

  @Output()
  isValidChange = new EventEmitter<boolean>;

  shouldEncrypt: boolean = false;

  onTitleAndDescriptionValid(isValid: boolean) {
    this.isTitleAndDescriptionValid = isValid;
    this.checkIfAllValid();
  }

  onLimitationsValid(isValid: boolean) {
    this.areLimitationsValid = isValid;
    this.checkIfAllValid();
  }

  onDatesValid(isValid: boolean) {
    this.areDatesValid = isValid;
    this.checkIfAllValid();
  }

  onShouldEncrypt(value: boolean) {
    this.shouldEncrypt = value;
  }

  ngOnInit() {
    if (this.votingRequest.dates.encryptedUntil) {
      this.shouldEncrypt = true;
    }
  }

  private isTitleAndDescriptionValid = false;
  private areLimitationsValid = false;
  private areDatesValid = false;

  private checkIfAllValid() {
    this.isValidChange.emit(this.isTitleAndDescriptionValid && this.areLimitationsValid && this.areDatesValid);
  }
}

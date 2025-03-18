import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateVotingRequest} from '../create-voting-request';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {TitleAndDescriptionComponent} from './title-and-description/title-and-description.component';
import {LimitationsComponent} from './limitations/limitations.component';
import {DatesComponent} from './dates/dates.component';

export enum CreateVotingBasicDataType {
  Title,
  Description,
  NumOfVoters,
  MaxChoices,
  StartDate,
  EndDate,
  EncryptedUntil
}

@Component({
  selector: 'app-create-voting-basic-data',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    TitleAndDescriptionComponent,
    LimitationsComponent,
    DatesComponent
  ],
  templateUrl: './create-voting-basic-data.component.html',
  styleUrl: './create-voting-basic-data.component.css'
})
export class CreateVotingBasicDataComponent {
  @Input()
  votingRequest = new CreateVotingRequest();

  @Output()
  isValid = new EventEmitter<boolean>;
}

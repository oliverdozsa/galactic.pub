import {CreateVotingRequest} from '../create-voting-request';
import {Subject} from 'rxjs';
import {CreateVotingBasicDataType} from './create-voting-basic-data.component';

export class CreateVotingTitleAndDesc {
  validationEvent =
    new Subject<{type: CreateVotingBasicDataType, isValid: boolean}>();

  constructor(public votingRequest: CreateVotingRequest) {
  }

  set title(value: string) {
    this.votingRequest.title = value;
    this.validationEvent.next({type: CreateVotingBasicDataType.Title, isValid: this.isTitleValid});
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
    this.validationEvent.next({type: CreateVotingBasicDataType.Description, isValid: this.isDescriptionValid});
  }

  get description() {
    return this.votingRequest.description;
  }

  get isDescriptionValid() {
    return this.votingRequest.description != null &&
      this.votingRequest.description.length > 1 && this.votingRequest.description.length <= 1000;
  }
}

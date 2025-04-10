import {CreatePollOptionRequest} from './create-poll-option-request';

export class CreatePollRequest {
  question = "";
  description = "";
  options: CreatePollOptionRequest[] = [];
}

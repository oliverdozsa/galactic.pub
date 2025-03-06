import {Component, Input} from '@angular/core';
import {BallotType, CreateVotingRequest, VotingVisibility} from '../create-voting-request';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-voting-basic-data',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-voting-basic-data.component.html',
  styleUrl: './create-voting-basic-data.component.css'
})
export class CreateVotingBasicDataComponent {
  VotingVisibility = VotingVisibility;
  BallotType = BallotType;

  @Input()
  votingRequest!: CreateVotingRequest;

  get visibilityHint(): string {
    if(this.votingRequest.visibility == VotingVisibility.Private) {
      return "Voting will be only visible to participants.";
    } else if(this.votingRequest.visibility == VotingVisibility.Unlisted) {
      return "Voting will be visible to anyone who has the link.";
    }

    return "<UNKOWN VISIBILITY>";
  }

  get ballotTypeHint(): string {
    if(this.votingRequest.ballotType == BallotType.MultiPoll) {
      return "Voting can have multiple polls with 1 choice / poll.";
    } else if(this.votingRequest.ballotType == BallotType.MultiChoice) {
      return "Voting can have only 1 poll with multiple choices."
    }

    return "<UNKOWN BALLOT TYPE>";
  }
}

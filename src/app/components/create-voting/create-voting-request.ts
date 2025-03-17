export enum VotingVisibility {
  Unlisted = "UNLISTED",
  Private = "PRIVATE"
}

export enum BallotType {
  MultiPoll = "MULTI_POLL",
  MultiChoice = "MULTI_CHOICE"
}

export class CreateVotingRequest {
  title: string = "";
  description: string = "";
  maxVoters: number = 0;
  maxChoices?: number;
  visibility: string = "";
  dates: {
    encryptedUntil?: string,
    startDate: string,
    endDate: string
  } = {
    startDate: "",
    endDate: ""
  };
  ballotType?: string
}

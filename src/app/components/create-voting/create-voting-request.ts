export enum VotingVisibility {
  Unlisted = "UNLISTED",
  Private = "PRIVATE"
}

export enum BallotType {
  MultiPoll = "MULTI_POLL",
  MultiChoice = "MULTI_CHOICE"
}

export interface CreateVotingRequest {
  title: string,
  description: string,
  maxVoters: number,
  maxChoices?: number,
  visibility: string,
  dates: {
    encryptedUntil?: string,
    startDate: string,
    endDate: string
  },
  ballotType?: string
}

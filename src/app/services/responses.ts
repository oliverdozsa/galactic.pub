export interface Voting {
  id: number,
  title: string,
  description: string,
  maxVoters: number,
  createdAt: string,
  decryptionKey: string,
  startDate: string,
  endDate: string,
  encryptedUntil: string,
  assetCode: string,
  visibility: string,
  ballotType: string,
  maxChoices: number,
  isOnTestNetwork: boolean,
  polls: VotingPoll[],
  numOfVoters: number,
  fundingAccountId: string,
  distributionAccountId: string,
  ballotAccountId: string,
  issuerAccountId: string
}

export interface VotingPoll {
  index: number,
  question: string,
  description: string,
  pollOptions: VotingPollOption[]
}

export interface VotingPollOption {
  name: string,
  code: number
}

export interface Page<T> {
  items: T[],
  totalPages: number
}

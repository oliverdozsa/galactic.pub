import {Voting} from '../../services/responses';

export enum VotingStatus {
  NotReadyYet,
  Open,
  Ended
}

export function getVotingStatus(voting: Voting): VotingStatus {
  const startDate = Date.parse(voting.startDate);
  const endDate = Date.parse(voting.endDate);
  const now = Date.now();

  if (startDate > now || !voting.distributionAccountId) {
    return VotingStatus.NotReadyYet;
  } else if (endDate > now) {
    return VotingStatus.Open
  }

  return VotingStatus.Ended;
}

export function getVotingStatusText(status: VotingStatus) {
  switch (status) {
    case VotingStatus.NotReadyYet:
      return "voting is not ready yet, check back later";
    case VotingStatus.Open:
      return "voting is open!";
    case VotingStatus.Ended:
      return "voting ended";
  }
}

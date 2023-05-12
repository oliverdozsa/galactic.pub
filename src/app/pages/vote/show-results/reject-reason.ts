export enum RejectReason {
  None,
  VotingIsPrivateAndUserIsNotAllowed,
  VotingIsPrivateButUserIsUnauthenticated,
  VotingIsStillEncrypted,
  Unknown
}

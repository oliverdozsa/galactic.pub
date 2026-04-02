export class CastVoteMessage {

  constructor(votingId: number, voteTokenAccount: string) {
    // TODO
  }

  get message(): string {
    // TODO
    return "";
  }

  public createEnvelope(commissionSigningKeyPublic: string) {
    // TODO
  }

  public createMessageSignatureFrom(envelopeSignature: string) {
    // TODO
  }
}

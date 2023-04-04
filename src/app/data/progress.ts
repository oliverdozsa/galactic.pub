import {KeyPair} from "../components/create-voting/account/key-pair";

export enum ProgressState {
  PreInit,
  Initialized,
  SigningEnvelope,
  SignedEnvelope,
  CreatingTransaction,
  CreatedTransaction,
  CastingVote,
  Completed,
  CompletelyFailed
}

export class Progress {
  state: ProgressState = ProgressState.PreInit
  voterAccount: KeyPair | undefined;
  publicKeyForEnvelope: string | undefined;
  message: string | undefined;
  concealed: string | undefined;
  concealingFactor: string | undefined;
  revealedSignature: string | undefined;
  createAccountBlockchainTransaction: string | undefined;
  selectedOptions: any[] = [];
  castedVoteTransactionId: string | undefined;
  network: string | undefined;
}

export function describeState(state: ProgressState): string {
  switch (state) {
    case ProgressState.PreInit:
      return "initializing"
    case ProgressState.Initialized:
      return "initialized";
    case ProgressState.SigningEnvelope:
      return "signing envelope";
    case ProgressState.SignedEnvelope:
      return "signed envelope";
    case ProgressState.CreatingTransaction:
      return "creating transaction";
    case ProgressState.CreatedTransaction:
      return "created transaction";
    case ProgressState.CastingVote:
      return "casting vote";
    case ProgressState.Completed:
      return "completed";
    case ProgressState.CompletelyFailed:
      return "failed";
    default:
      return "<unknown>";
  }
}

export function loadOrDefaultProgresses(): Map<string, Progress> {
  let progressesStr = localStorage.getItem("progresses");

  if (progressesStr == null) {
    return new Map<string, Progress>()
  }

  return new Map<string, Progress>(JSON.parse(progressesStr));
}

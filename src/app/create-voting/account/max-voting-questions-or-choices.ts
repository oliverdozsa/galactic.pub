import {CreateVotingForm} from "../create-voting-form";

export class MaxVotingQuestionsOrChoices {
  determine(form: CreateVotingForm): number {
    if (form.selectedNetwork == "stellar") {
      return form.isEncrypted ? 1 : 4;
    }

    return 0;
  }
}

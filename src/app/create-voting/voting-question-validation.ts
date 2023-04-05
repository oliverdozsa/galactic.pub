import {VotingQuestion} from "./voting-question";

export class VotingQuestionValidation {
  constructor(private votingQuestion: VotingQuestion) {
  }

  get isQuestionValid(): boolean {
    return this.votingQuestion.question.length > 1 && this.votingQuestion.question.length < 1000
  }

  get isOptionsLengthValid(): boolean {
    return this.votingQuestion.options.length > 1;
  }

  get isDescriptionValid() {
    return this.votingQuestion.description.length <= 1000;
  }

  get isValid(): boolean {
    return this.areAllOptionsValid() && this.isQuestionValid && this.isOptionsLengthValid && this.isDescriptionValid;
  }

  isOptionValidAt(i: number) {
    return this.isOptionValid(this.votingQuestion.options[i]);
  }

  isOptionValid(option: string): boolean {
    return option.length > 1 && option.length < 1000;
  }

  areAllOptionsValid() {
    return this.votingQuestion.options
      .map(o => this.isOptionValid(o))
      .reduce((prev, current) => prev && current, true);
  }
}

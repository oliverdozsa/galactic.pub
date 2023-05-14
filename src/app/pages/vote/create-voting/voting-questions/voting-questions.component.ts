import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";
import {MaxVotingQuestionsOrChoices} from "../../../../create-voting/account/max-voting-questions-or-choices";
import {BallotType} from "../../../../create-voting/ballot-type";
import {VotingQuestionValidation} from "../../../../create-voting/voting-question-validation";
import {VotingQuestion} from "../../../../create-voting/voting-question";

@Component({
  selector: 'app-voting-questions',
  templateUrl: './voting-questions.component.html',
  styleUrls: ['./voting-questions.component.scss']
})
export class VotingQuestionsComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  maxQuestions = new MaxVotingQuestionsOrChoices();

  get remainingNumberOfPossibleQuestions(): number {
    if (this.form.ballotType == BallotType.MULTI_CHOICE) {
      const maxPossible = 1 - this.form.questions.length;
      return maxPossible >= 0 ? maxPossible : 0;
    }

    return this.maxQuestions.determine(this.form) - this.form.questions.length;
  }

  getWarnMessageFor(i: number): string {
    const validation = new VotingQuestionValidation(this.form.questions[i]);

    if (!validation.isQuestionValid) {
      return "Question's length should be > 1 and < 1000!";
    }

    if (!validation.isOptionsLengthValid) {
      return "There must be at least 2 options!"
    }

    if (!validation.areAllOptionsValid()) {
      return "Each option must have length > 1 and < 1000!";
    }

    if (!validation.isDescriptionValid) {
      return "Description must have length <= 1000!";
    }

    return "";
  }

  addOptionClickedAt(i: number) {
    this.form.questions[i].addNewEmptyOption();
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  deleteOptionClicked(i: number, j: number) {
    this.form.questions[i].deleteAt(j);
  }

  addQuestionClicked() {
    this.form.questions.push(new VotingQuestion());
  }

  deleteQuestionClicked(i: number) {
    this.form.questions.splice(i, 1);
  }

  isQuestionValid(question: VotingQuestion) {
    const validation = new VotingQuestionValidation(question);
    return validation.isQuestionValid;
  }

  isDescriptionValid(question: VotingQuestion) {
    const validation = new VotingQuestionValidation(question);
    return validation.isDescriptionValid;
  }

  isOptionValidAt(i: number, question: VotingQuestion) {
    const validation = new VotingQuestionValidation(question);
    return validation.isOptionValidAt(i);
  }
}

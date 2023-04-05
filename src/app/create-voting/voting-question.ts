export class VotingQuestion {
  options: string[] = [];
  question: string = "";
  description: string = "";

  deleteAt(i: number) {
    this.options.splice(i, 1);
  }

  addNewEmptyOption() {
    this.options.push("");
  }
}

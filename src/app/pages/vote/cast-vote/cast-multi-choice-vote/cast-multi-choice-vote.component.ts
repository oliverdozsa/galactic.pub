import {Component, Input} from '@angular/core';
import {Voting} from "../../../../data/voting";

@Component({
  selector: 'app-cast-multi-choice-vote',
  templateUrl: './cast-multi-choice-vote.component.html',
  styleUrls: ['./cast-multi-choice-vote.component.scss']
})
export class CastMultiChoiceVoteComponent {
  @Input()
  voting: Voting = new Voting();

  selectedOptions: any[] = [];

  get areChoicesValid() {
    if (this.selectedOptions && this.selectedOptions.length > 0) {
      const numOfChoices = this.selectedOptions.reduce((a, c) => c ? ++a : a, 0);
      return numOfChoices > 0 && numOfChoices <= this.voting.maxChoices!;
    }

    return false;
  }

}

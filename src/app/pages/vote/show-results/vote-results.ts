import {PollIndex, PollOptionCode} from "./show-results-operations";
import {Voting} from "../../../data/voting";
import {DecryptChoices} from "./decrypt-choices";
import {ParseChoices} from "./parse-choices";

export class VoteResults {
  public collected: Map<PollIndex, Map<PollOptionCode, Number>> = new Map<PollIndex, Map<PollOptionCode, Number>>();
  private decryptChoices: DecryptChoices | undefined;

  constructor(private voting: Voting) {
    voting.polls.forEach(p => this.collected.set(p.index, new Map<PollOptionCode, Number>()));

    if (this.voting.decryptionKey) {
      this.decryptChoices = new DecryptChoices(this.voting.decryptionKey);
    }
  }

  public addChoices(choicesRaw: string | undefined) {
    let choices = choicesRaw;

    if (this.voting.decryptionKey != null) {
      choices = this.decryptChoices?.decrypt(choices);
    }

    const parsedChoices: [PollIndex, PollOptionCode][] = ParseChoices.parse(choices, this.voting);

    if (ParseChoices.areChoicesValidFor(this.voting, parsedChoices)) {
      this.addParsedChoices(parsedChoices);
    } else {
      console.warn(`Choices: ${choices} are not valid in voting; ignored`);
    }
  }

  private addParsedChoices(choices: [PollIndex, PollOptionCode][]) {
    choices.forEach(c => this.addParsedChoice(c))
  }

  private addParsedChoice(choice: [PollIndex, PollOptionCode]) {
    if (!this.collected.has(choice[0])) {
      this.collected.set(choice[0], new Map<PollOptionCode, Number>());
    }

    const resultsOfPoll = this.collected.get(choice[0])!;

    if (resultsOfPoll.has(choice[1])) {
      const currentVotesForOption = resultsOfPoll.get(choice[1])!.valueOf();
      resultsOfPoll.set(choice[1], currentVotesForOption + 1);
    } else {
      resultsOfPoll.set(choice[1], 1);
    }
  }
}

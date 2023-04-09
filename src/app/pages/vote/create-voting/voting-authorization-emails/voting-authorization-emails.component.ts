import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-voting-authorization-emails',
  templateUrl: './voting-authorization-emails.component.html',
  styleUrls: ['./voting-authorization-emails.component.scss']
})
export class VotingAuthorizationEmailsComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  userInput: string = "";

  private emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() { }

  onEmailRemove(email: string) {
    this.form.authorizationEmails.delete(email);
  }

  onEmailAdd(email: string) {
    if(this.isUserInputValid) {
      this.form.authorizationEmails.add(email);
      // input.nativeElement.value = "";
    }
  }

  onEmailAddClick($event: any) {
    this.form.authorizationEmails.add($event.value);
    $event.input.value = "";
    this.userInput = "";
  }

  get isUserInputValid(): boolean {
    return (this.userInput == "" || this.userInput.match(this.emailPattern) != null);
  }

  get dangerTextEmailField(): string {
    if(!this.isUserInputValid) {
      return "Must enter a valid email address.";
    }

    if(!this.form.validation.isAuthorizationInputValid) {
      return "Must have at least one email address added.";
    }

    return "";
  }

  get dangerTextOrganizerField(): string {
    if(!this.form.validation.isOrganizerValid) {
      return "If casting voting is based on invites, the organizer must not be empty."
    }

    return "";
  }
}

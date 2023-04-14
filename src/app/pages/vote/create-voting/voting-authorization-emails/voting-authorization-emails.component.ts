import {Component, Input, OnInit} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";
import {TagsInputTag} from "../../../../components/tags-input/tags-input-tag";

@Component({
  selector: 'app-voting-authorization-emails',
  templateUrl: './voting-authorization-emails.component.html',
  styleUrls: ['./voting-authorization-emails.component.scss']
})
export class VotingAuthorizationEmailsComponent implements OnInit{
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  tags: TagsInputTag[] = [];

  private emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  inputValidation = (currentUserInput: string): string | undefined => {
    if(currentUserInput.length > 0 && currentUserInput.match(this.emailPattern) == null) {
      return "Must enter a valid email address.";
    } else {
      return undefined;
    }
  }

  tagsValidation = (tags: TagsInputTag[]): string | undefined => {
    if(tags.length == 0) {
      return "Must have at least one email address added."
    }

    return undefined;
  }

  onTagsChanged(tags: TagsInputTag[]) {
    this.form.authorizationEmails = new Set<string>(tags.map(t => t.text));
  }

  ngOnInit(): void {
    this.tags = Array.from(this.form.authorizationEmails)
      .map(email => ({text: email} as TagsInputTag));
  }
}

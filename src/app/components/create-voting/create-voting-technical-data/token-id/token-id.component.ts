import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateVotingRequest} from '../../create-voting-request';

@Component({
  selector: 'app-token-id',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './token-id.component.html',
  styleUrl: './token-id.component.css'
})
export class TokenIdComponent {
  @Input()
  votingRequest!: CreateVotingRequest;

  @Output()
  isValidChange = new EventEmitter<boolean>();

  private validRegex = new RegExp("^[0-9a-z]+$")

  get isValid(): boolean {
    const tokenId = this.votingRequest.tokenId;
    return this.validRegex.test(tokenId) && tokenId.length >= 2 && tokenId.length <= 8;
  }

  set tokenId(value: string) {
    this.votingRequest.tokenId = value;
    this.isValidChange.emit(this.isValid);
  }

  get tokenId() {
    return this.votingRequest.tokenId;
  }
}

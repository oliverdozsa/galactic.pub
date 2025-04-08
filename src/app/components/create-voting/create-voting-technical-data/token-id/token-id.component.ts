import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class TokenIdComponent implements OnInit {
  @Input()
  votingRequest!: CreateVotingRequest;

  @Output()
  isValidChange = new EventEmitter<boolean>();

  private validRegex = /^[0-9a-z]+$/;
  private invalidRegex = /[^0-9a-z]/g;

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

  onGenerateClicked() {
    const title = this.votingRequest.title;
    const clearedTitle = title.toLowerCase().replaceAll(this.invalidRegex, "");
    const tokenLetters = clearedTitle.slice(0, 4);
    this.tokenId = tokenLetters + this.randomNumbersAsStringOfLength(4);
  }

  ngOnInit() {
    this.isValidChange.emit(this.isValid);
  }

  private randomNumbersAsStringOfLength(length: number): string {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += this.randomNumber0To10();
    }

    return result;
  }

  private randomNumber0To10(): number {
    return Math.round(Math.random() * 10);
  }
}

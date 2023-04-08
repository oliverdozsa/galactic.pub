import {Component, Input} from '@angular/core';
import {CreateVotingForm} from "../../../../create-voting/create-voting-form";

@Component({
  selector: 'app-voting-encryption',
  templateUrl: './voting-encryption.component.html',
  styleUrls: ['./voting-encryption.component.scss']
})
export class VotingEncryptionComponent {
  @Input()
  form: CreateVotingForm = new CreateVotingForm();

  get rawEncryptedUntil():string {
    return this._rawEncryptedUntil;
  }

  set rawEncryptedUntil(value: string) {
    this._rawEncryptedUntil = value;
    this.form.encryptedUntil = new Date(Date.parse(this._rawEncryptedUntil));
  }

  private _rawEncryptedUntil: string = "";
}

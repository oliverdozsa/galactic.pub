import {inject, Injectable} from '@angular/core';
import {SigningPublicKey, Voting} from './responses';
import {Observable, of, Subject} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export type PollIndex = number;
export type PollOptionCode = number;

@Injectable({
  providedIn: 'root'
})
export class CastVoteService {
  voting!: Voting;

  spinnerService = inject(NgxSpinnerService);

  initiated = new Subject<void>();

  progressText = "";

  private httpClient = inject(HttpClient);
  private apiUrl: string;

  initiateFor(voting: Voting) {
    this.voting = voting;
    this.initiated.next();
  }

  castVote() {
    // TODO: steps
    //   1. Create the RSA envelope: the message in the format: votingId|voteTokenHolderNewAccount
    //      and from this create enveloped message
    //   2. Send the RSA envelope for signing () /signenvelope API (authenticated)
    //   3. From step 1. & 2. construct the revealed signature for the original message
    //   4. Get the transaction XDR by sending the revealed message to /transaction API anonymously!
    //   5. Send the transaction to the Stellar network to have the vote token on the holder account
    //   6. Cast the vote by sending the vote token from holder to the ballot account. The memo contains the choices.
    //      Take care of encrypted voting!
    //
    //   Notes: choices are encoded as 4 digit numbers: aabb where aa is a zero padded at start number of the
    //          poll index, and bb is similar but encodes the option code. If voting is encrypted encrypt the choices
    //          through the encrypt API first.
    this.spinnerService.show("forCastingVote");
    // TODO
    this.getSigningKeyPublic().subscribe({next: k => console.log(JSON.stringify(k))});
  }

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  private getSigningKeyPublic(): Observable<SigningPublicKey> {
    return this.httpClient.get<SigningPublicKey>(this.apiUrl + "/stellar/commission/publickey");
  }
}

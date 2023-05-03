import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export interface CastVoteInitResponse {
  publicKey: string
}

export interface CastVoteSignEnvelopeResponse {
  envelopeSignatureBase64: string
}

export interface CastVoteCreateTransactionResponse {
  transaction: string;
}

export interface EncryptedChoiceResponse {
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class CastVoteService {
  private static BASE_URL = environment.apiUrl + "/castvote";

  selectedOptionsChange$ = new Subject<any[]>();
  isAllowedToCastVoteChange$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {
  }

  init(votingId: string): Observable<CastVoteInitResponse> {
    const url = CastVoteService.BASE_URL + "/init";
    return this.httpClient.post<CastVoteInitResponse>(url, {votingId: votingId});
  }

  signEnvelope(votingId: string, envelopeBase64: string): Observable<CastVoteSignEnvelopeResponse> {
    const url = CastVoteService.BASE_URL + `/${votingId}/signEnvelope`;
    return this.httpClient.post<CastVoteSignEnvelopeResponse>(url, {envelopeBase64: envelopeBase64});
  }

  getEnvelopeSignature(votingId: string) {
    const url = CastVoteService.BASE_URL + `/envlSignature/${votingId}`;
    return this.httpClient.get<CastVoteSignEnvelopeResponse>(url);
  }

  createTransaction(message: string, revealedSignature: string): Observable<CastVoteCreateTransactionResponse> {
    const url = CastVoteService.BASE_URL + `/createTransaction`;
    return this.httpClient.post<CastVoteCreateTransactionResponse>(
      url,
      {
        message: message,
        revealedSignatureBase64: revealedSignature
      }
    );
  }

  getTransactionString(revealedSignature: string): Observable<CastVoteCreateTransactionResponse> {
    const url = CastVoteService.BASE_URL + `/txOfSignature/${encodeURIComponent(revealedSignature)}`;
    return this.httpClient.get<CastVoteCreateTransactionResponse>(url);
  }

  getEncryptedChoice(votingId: string, choice: string): Observable<EncryptedChoiceResponse> {
    const url = environment.apiUrl + `/encryptchoice/${votingId}/${choice}`;
    return this.httpClient.get<EncryptedChoiceResponse>(url);
  }
}

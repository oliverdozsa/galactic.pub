import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CreateVotingRequest} from '../components/create-voting/create-voting-request';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private httpClient = inject(HttpClient);
  private apiUrl;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  public create(request: CreateVotingRequest) {
    const url = this.apiUrl + `/stellar/votings`;
    return this.httpClient.post(url, request);
  }
}

import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CreateVotingRequest} from '../components/create-voting/create-voting-request';
import {Page, Voting} from './responses';

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

  public getCreated(page: number = 0) {
    const url = this.apiUrl + `/stellar/votings/created`;
    let queryParams = new HttpParams();

    if(page > 0) {
      queryParams = queryParams.set("page", page);
    }

    return this.httpClient.get<Page<Voting>>(url, {params: queryParams});
  }
}

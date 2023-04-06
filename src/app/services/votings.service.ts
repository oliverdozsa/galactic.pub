import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {VotingSummary} from "../data/voting.summary";
import {Page} from "../data/page";
import {Observable} from "rxjs";
import {CreateVotingRequest} from "./create-voting-request";
import {Voting} from "../data/voting";
import {CreateVotingForm} from "../create-voting/create-voting-form";

export enum PagingSource {
  PUBLIC,
  VOTE_CALLER,
  VOTER
}

@Injectable({
  providedIn: 'root'
})
export class VotingsService {
  constructor(private httpClient: HttpClient) {
  }

  create(form: CreateVotingForm): Observable<any> {
    const url = environment.apiUrl + "/voting";

    const request = CreateVotingRequest.fromCreateVotingForm(form);

    return this.httpClient.post(url, request);
  }

  getVotingsOf(source: PagingSource = PagingSource.PUBLIC, page: number = 1, itemsPerPage: number = 10,
               filterByNotTriedToCastVote: boolean = false): Observable<Page<VotingSummary>> {
    let url = environment.apiUrl;

    if (source == PagingSource.PUBLIC) {
      url += "/votings/public";
    } else if (source == PagingSource.VOTE_CALLER) {
      url += "/votings/votecaller";
    } else if (source == PagingSource.VOTER) {
      url += "/votings/voter";
    }

    let queryParams = new HttpParams()
      .set('offset', this.toOffset(page, itemsPerPage))
      .set('limit', itemsPerPage);

    if(source == PagingSource.VOTER) {
      queryParams = queryParams.set("filterByNotTriedToCastVote", filterByNotTriedToCastVote)
    }

    return this.httpClient.get<Page<VotingSummary>>(url, {params: queryParams});

  }

  single(id: string): Observable<Voting> {
    let url = environment.apiUrl + `/voting/${id}`;
    return this.httpClient.get<Voting>(url);
  }

  private toOffset(page: number, itemsPerPage: number): number {
    return (page - 1) * itemsPerPage
  }
}

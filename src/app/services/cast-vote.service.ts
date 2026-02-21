import { Injectable } from '@angular/core';
import {Voting} from './responses';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastVoteService {
  voting!: Voting;

  castVoteStarted = new Subject<void>();

  constructor() { }
}

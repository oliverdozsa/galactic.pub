import { TestBed } from '@angular/core/testing';

import { CastVoteService } from './cast-vote.service';

describe('CastVoteService', () => {
  let service: CastVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CastVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

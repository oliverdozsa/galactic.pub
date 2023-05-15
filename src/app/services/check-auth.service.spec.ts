import { TestBed } from '@angular/core/testing';

import { CheckAuthService } from './check-auth.service';

describe('CheckAuthService', () => {
  let service: CheckAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

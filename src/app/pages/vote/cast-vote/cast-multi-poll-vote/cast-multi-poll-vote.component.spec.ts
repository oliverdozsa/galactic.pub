import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMultiPollVoteComponent } from './cast-multi-poll-vote.component';

describe('CastMultiPollVoteComponent', () => {
  let component: CastMultiPollVoteComponent;
  let fixture: ComponentFixture<CastMultiPollVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastMultiPollVoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastMultiPollVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingPollsComponent } from './view-voting-polls.component';

describe('ViewVotingPollsComponent', () => {
  let component: ViewVotingPollsComponent;
  let fixture: ComponentFixture<ViewVotingPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVotingPollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingDatesComponent } from './view-voting-dates.component';

describe('ViewVotingDatesComponent', () => {
  let component: ViewVotingDatesComponent;
  let fixture: ComponentFixture<ViewVotingDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVotingDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

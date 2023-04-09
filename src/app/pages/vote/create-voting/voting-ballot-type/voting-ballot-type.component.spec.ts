import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingBallotTypeComponent } from './voting-ballot-type.component';

describe('VotingBallotTypeComponent', () => {
  let component: VotingBallotTypeComponent;
  let fixture: ComponentFixture<VotingBallotTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingBallotTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingBallotTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingStartEndDateComponent } from './voting-start-end-date.component';

describe('VotingStartEndDateComponent', () => {
  let component: VotingStartEndDateComponent;
  let fixture: ComponentFixture<VotingStartEndDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingStartEndDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingStartEndDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

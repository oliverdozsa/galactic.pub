import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastVoteProgressComponent } from './cast-vote-progress.component';

describe('CastVoteProgressComponent', () => {
  let component: CastVoteProgressComponent;
  let fixture: ComponentFixture<CastVoteProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastVoteProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastVoteProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

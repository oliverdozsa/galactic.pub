import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMultiChoiceVoteComponent } from './cast-multi-choice-vote.component';

describe('CastMultiChoiceVoteComponent', () => {
  let component: CastMultiChoiceVoteComponent;
  let fixture: ComponentFixture<CastMultiChoiceVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastMultiChoiceVoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastMultiChoiceVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

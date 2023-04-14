import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingQuestionsComponent } from './voting-questions.component';

describe('VotingQuestionsComponent', () => {
  let component: VotingQuestionsComponent;
  let fixture: ComponentFixture<VotingQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

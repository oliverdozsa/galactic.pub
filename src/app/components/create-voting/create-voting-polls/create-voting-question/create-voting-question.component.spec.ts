import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingQuestionComponent } from './create-voting-question.component';

describe('CreateVotingQuestionComponent', () => {
  let component: CreateVotingQuestionComponent;
  let fixture: ComponentFixture<CreateVotingQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVotingQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVotingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

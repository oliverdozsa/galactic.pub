import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingStepsComponent } from './create-voting-steps.component';

describe('CreateVotingStepsComponent', () => {
  let component: CreateVotingStepsComponent;
  let fixture: ComponentFixture<CreateVotingStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVotingStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVotingStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

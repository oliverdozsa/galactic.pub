import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingPollsComponent } from './create-voting-polls.component';

describe('CreateVotingPollsComponent', () => {
  let component: CreateVotingPollsComponent;
  let fixture: ComponentFixture<CreateVotingPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVotingPollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVotingPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

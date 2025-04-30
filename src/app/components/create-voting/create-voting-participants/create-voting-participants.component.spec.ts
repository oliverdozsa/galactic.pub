import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingParticipantsComponent } from './create-voting-participants.component';

describe('CreateVotingParticipantsComponent', () => {
  let component: CreateVotingParticipantsComponent;
  let fixture: ComponentFixture<CreateVotingParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVotingParticipantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVotingParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

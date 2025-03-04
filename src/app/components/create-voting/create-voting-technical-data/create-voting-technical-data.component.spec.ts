import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingTechnicalDataComponent } from './create-voting-technical-data.component';

describe('CreateVotingTechnicalDataComponent', () => {
  let component: CreateVotingTechnicalDataComponent;
  let fixture: ComponentFixture<CreateVotingTechnicalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVotingTechnicalDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVotingTechnicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

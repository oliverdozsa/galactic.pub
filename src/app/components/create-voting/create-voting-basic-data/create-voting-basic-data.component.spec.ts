import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingBasicDataComponent } from './create-voting-basic-data.component';

describe('CreateVotingBasicDataComponent', () => {
  let component: CreateVotingBasicDataComponent;
  let fixture: ComponentFixture<CreateVotingBasicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVotingBasicDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVotingBasicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

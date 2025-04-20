import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVotingOptionsComponent } from './create-voting-options.component';

describe('CreateVotingOptionsComponent', () => {
  let component: CreateVotingOptionsComponent;
  let fixture: ComponentFixture<CreateVotingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVotingOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVotingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

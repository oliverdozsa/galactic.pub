import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingHomeComponent } from './voting-home.component';

describe('VotingHomeComponent', () => {
  let component: VotingHomeComponent;
  let fixture: ComponentFixture<VotingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

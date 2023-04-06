import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsPaginationComponent } from './votings-pagination.component';

describe('VotingsPaginationComponent', () => {
  let component: VotingsPaginationComponent;
  let fixture: ComponentFixture<VotingsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingsPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

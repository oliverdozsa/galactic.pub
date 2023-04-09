import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesLimitComponent } from './votes-limit.component';

describe('VotesLimitComponent', () => {
  let component: VotesLimitComponent;
  let fixture: ComponentFixture<VotesLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotesLimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotesLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingTitleComponent } from './voting-title.component';

describe('VotingTitleComponent', () => {
  let component: VotingTitleComponent;
  let fixture: ComponentFixture<VotingTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

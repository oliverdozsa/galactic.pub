import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsVoteComponent } from './lets-vote.component';

describe('LetsVoteComponent', () => {
  let component: LetsVoteComponent;
  let fixture: ComponentFixture<LetsVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetsVoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetsVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

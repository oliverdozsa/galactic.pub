import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingComponent } from './view-voting.component';

describe('ViewVotingComponent', () => {
  let component: ViewVotingComponent;
  let fixture: ComponentFixture<ViewVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVotingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

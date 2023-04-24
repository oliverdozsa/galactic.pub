import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingOtherDataComponent } from './view-voting-other-data.component';

describe('ViewVotingOtherDataComponent', () => {
  let component: ViewVotingOtherDataComponent;
  let fixture: ComponentFixture<ViewVotingOtherDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVotingOtherDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingOtherDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

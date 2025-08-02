import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingTechnicalDataComponent } from './view-voting-technical-data.component';

describe('ViewVotingTechnicalDataComponent', () => {
  let component: ViewVotingTechnicalDataComponent;
  let fixture: ComponentFixture<ViewVotingTechnicalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVotingTechnicalDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingTechnicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

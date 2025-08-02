import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingBasicDataComponent } from './view-voting-basic-data.component';

describe('ViewVotingBasicDataComponent', () => {
  let component: ViewVotingBasicDataComponent;
  let fixture: ComponentFixture<ViewVotingBasicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVotingBasicDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingBasicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

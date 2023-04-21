import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingNetworkDataComponent } from './view-voting-network-data.component';

describe('ViewVotingNetworkDataComponent', () => {
  let component: ViewVotingNetworkDataComponent;
  let fixture: ComponentFixture<ViewVotingNetworkDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVotingNetworkDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingNetworkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsViewerComponent } from './votings-viewer.component';

describe('VotingsViewerComponent', () => {
  let component: VotingsViewerComponent;
  let fixture: ComponentFixture<VotingsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingsViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

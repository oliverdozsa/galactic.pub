import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingAuthorizationModeComponent } from './voting-authorization-mode.component';

describe('VotingAuthorizationModeComponent', () => {
  let component: VotingAuthorizationModeComponent;
  let fixture: ComponentFixture<VotingAuthorizationModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingAuthorizationModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingAuthorizationModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

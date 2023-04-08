import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingTokenIdentifierComponent } from './voting-token-identifier.component';

describe('VotingTokenIdentifierComponent', () => {
  let component: VotingTokenIdentifierComponent;
  let fixture: ComponentFixture<VotingTokenIdentifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingTokenIdentifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingTokenIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

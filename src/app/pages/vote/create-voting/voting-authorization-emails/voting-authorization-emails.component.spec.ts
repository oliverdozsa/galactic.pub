import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingAuthorizationEmailsComponent } from './voting-authorization-emails.component';

describe('VotingAuthorizationEmailsComponent', () => {
  let component: VotingAuthorizationEmailsComponent;
  let fixture: ComponentFixture<VotingAuthorizationEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingAuthorizationEmailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingAuthorizationEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

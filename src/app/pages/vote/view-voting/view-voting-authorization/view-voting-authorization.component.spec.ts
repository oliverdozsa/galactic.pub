import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingAuthorizationComponent } from './view-voting-authorization.component';

describe('ViewVotingAuthorizationComponent', () => {
  let component: ViewVotingAuthorizationComponent;
  let fixture: ComponentFixture<ViewVotingAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVotingAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

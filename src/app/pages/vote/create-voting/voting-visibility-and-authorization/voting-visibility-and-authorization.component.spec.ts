import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingVisibilityAndAuthorizationComponent } from './voting-visibility-and-authorization.component';

describe('VotingVisibilityAndAuthorizationComponent', () => {
  let component: VotingVisibilityAndAuthorizationComponent;
  let fixture: ComponentFixture<VotingVisibilityAndAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingVisibilityAndAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingVisibilityAndAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

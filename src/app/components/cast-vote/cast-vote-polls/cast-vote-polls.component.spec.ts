import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastVotePollsComponent } from './cast-vote-polls.component';

describe('CastVotePollsComponent', () => {
  let component: CastVotePollsComponent;
  let fixture: ComponentFixture<CastVotePollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastVotePollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastVotePollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

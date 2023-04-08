import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingDescriptionComponent } from './voting-description.component';

describe('VotingDescriptionComponent', () => {
  let component: VotingDescriptionComponent;
  let fixture: ComponentFixture<VotingDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

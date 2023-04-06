import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteHomeComponent } from './vote-home.component';

describe('VoteHomeComponent', () => {
  let component: VoteHomeComponent;
  let fixture: ComponentFixture<VoteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

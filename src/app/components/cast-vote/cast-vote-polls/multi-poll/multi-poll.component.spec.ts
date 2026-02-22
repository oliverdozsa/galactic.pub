import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPollComponent } from './multi-poll.component';

describe('MultiPollComponent', () => {
  let component: MultiPollComponent;
  let fixture: ComponentFixture<MultiPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiPollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

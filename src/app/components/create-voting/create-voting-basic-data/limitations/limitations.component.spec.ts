import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitationsComponent } from './limitations.component';

describe('LimitationsComponent', () => {
  let component: LimitationsComponent;
  let fixture: ComponentFixture<LimitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

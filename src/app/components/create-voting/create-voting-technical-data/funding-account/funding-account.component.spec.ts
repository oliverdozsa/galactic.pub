import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingAccountComponent } from './funding-account.component';

describe('FundingAccountComponent', () => {
  let component: FundingAccountComponent;
  let fixture: ComponentFixture<FundingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundingAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

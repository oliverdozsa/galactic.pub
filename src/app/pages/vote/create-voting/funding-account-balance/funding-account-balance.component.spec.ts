import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingAccountBalanceComponent } from './funding-account-balance.component';

describe('FundingAccountBalanceComponent', () => {
  let component: FundingAccountBalanceComponent;
  let fixture: ComponentFixture<FundingAccountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingAccountBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundingAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

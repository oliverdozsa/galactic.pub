import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingAccountSourceComponent } from './funding-account-source.component';

describe('FundingAccountSourceComponent', () => {
  let component: FundingAccountSourceComponent;
  let fixture: ComponentFixture<FundingAccountSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingAccountSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundingAccountSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

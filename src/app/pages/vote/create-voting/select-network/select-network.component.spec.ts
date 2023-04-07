import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNetworkComponent } from './select-network.component';

describe('SelectNetworkComponent', () => {
  let component: SelectNetworkComponent;
  let fixture: ComponentFixture<SelectNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

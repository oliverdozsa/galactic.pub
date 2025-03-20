import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenIdComponent } from './token-id.component';

describe('TokenIdComponent', () => {
  let component: TokenIdComponent;
  let fixture: ComponentFixture<TokenIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

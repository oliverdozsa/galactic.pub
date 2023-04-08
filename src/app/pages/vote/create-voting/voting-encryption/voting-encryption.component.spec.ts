import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingEncryptionComponent } from './voting-encryption.component';

describe('VotingEncryptionComponent', () => {
  let component: VotingEncryptionComponent;
  let fixture: ComponentFixture<VotingEncryptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingEncryptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVotingEncryptionComponent } from './view-voting-encryption.component';

describe('ViewVotingEncryptionComponent', () => {
  let component: ViewVotingEncryptionComponent;
  let fixture: ComponentFixture<ViewVotingEncryptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVotingEncryptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVotingEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

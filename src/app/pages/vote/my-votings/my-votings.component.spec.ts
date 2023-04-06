import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVotingsComponent } from './my-votings.component';

describe('MyVotingsComponent', () => {
  let component: MyVotingsComponent;
  let fixture: ComponentFixture<MyVotingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVotingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyVotingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

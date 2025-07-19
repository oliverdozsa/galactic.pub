import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCreatedVotingsComponent } from './my-created-votings.component';

describe('MyCreatedVotingsComponent', () => {
  let component: MyCreatedVotingsComponent;
  let fixture: ComponentFixture<MyCreatedVotingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCreatedVotingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCreatedVotingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

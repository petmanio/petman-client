import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsUpdateDialogComponent } from './user-details-update-dialog.component';

describe('UserDetailsUpdateDialogComponent', () => {
  let component: UserDetailsUpdateDialogComponent;
  let fixture: ComponentFixture<UserDetailsUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

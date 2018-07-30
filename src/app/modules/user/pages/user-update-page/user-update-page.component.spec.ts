import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatePageComponent } from './user-update-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('UserUpdatePageComponent', () => {
  let component: UserUpdatePageComponent;
  let fixture: ComponentFixture<UserUpdatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ UserUpdatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

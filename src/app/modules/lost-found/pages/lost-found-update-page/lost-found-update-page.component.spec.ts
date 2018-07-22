import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostFoundUpdatePageComponent } from './lost-found-update-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('LostFoundUpdatePageComponent', () => {
  let component: LostFoundUpdatePageComponent;
  let fixture: ComponentFixture<LostFoundUpdatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ LostFoundUpdatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostFoundUpdatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

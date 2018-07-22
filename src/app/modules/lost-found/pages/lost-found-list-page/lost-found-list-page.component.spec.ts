import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostFoundListPageComponent } from './lost-found-list-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('LostFoundListPageComponent', () => {
  let component: LostFoundListPageComponent;
  let fixture: ComponentFixture<LostFoundListPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ LostFoundListPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostFoundListPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

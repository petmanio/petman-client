import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostFoundDetailsPageComponent } from './lost-found-details-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('LostFoundDetailsPageComponent', () => {
  let component: LostFoundDetailsPageComponent;
  let fixture: ComponentFixture<LostFoundDetailsPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ LostFoundDetailsPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostFoundDetailsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

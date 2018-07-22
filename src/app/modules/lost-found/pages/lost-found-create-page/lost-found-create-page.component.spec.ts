import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostFoundCreatePageComponent } from './lost-found-create-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('LostFoundCreatePageComponent', () => {
  let component: LostFoundCreatePageComponent;
  let fixture: ComponentFixture<LostFoundCreatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ LostFoundCreatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostFoundCreatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

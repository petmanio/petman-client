import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPageComponent } from './add-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AddPageComponent', () => {
  let component: AddPageComponent;
  let fixture: ComponentFixture<AddPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AddPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

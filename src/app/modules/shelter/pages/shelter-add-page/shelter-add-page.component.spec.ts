import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterAddPageComponent } from './shelter-add-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ShelterAddPageComponent', () => {
  let component: ShelterAddPageComponent;
  let fixture: ComponentFixture<ShelterAddPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ShelterAddPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterAddPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

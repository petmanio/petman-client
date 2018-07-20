import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterUpdatePageComponent } from './shelter-update-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ShelterUpdatePageComponent', () => {
  let component: ShelterUpdatePageComponent;
  let fixture: ComponentFixture<ShelterUpdatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ShelterUpdatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterUpdatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

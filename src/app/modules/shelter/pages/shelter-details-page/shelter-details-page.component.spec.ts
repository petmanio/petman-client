import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterDetailsPageComponent } from './shelter-details-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ShelterDetailsPageComponent', () => {
  let component: ShelterDetailsPageComponent;
  let fixture: ComponentFixture<ShelterDetailsPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ShelterDetailsPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterDetailsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterCreatePageComponent } from './shelter-create-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ShelterCreatePageComponent', () => {
  let component: ShelterCreatePageComponent;
  let fixture: ComponentFixture<ShelterCreatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ShelterCreatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterCreatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterEditPageComponent } from './shelter-edit-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ShelterEditPageComponent', () => {
  let component: ShelterEditPageComponent;
  let fixture: ComponentFixture<ShelterEditPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ShelterEditPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterEditPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

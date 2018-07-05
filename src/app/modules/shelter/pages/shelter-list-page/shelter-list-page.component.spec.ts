import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterListPageComponent } from './shelter-list-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ShelterListPageComponent', () => {
  let component: ShelterListPageComponent;
  let fixture: ComponentFixture<ShelterListPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ShelterListPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterListPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

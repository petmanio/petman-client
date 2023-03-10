import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptUpdatePageComponent } from './adopt-update-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AdoptUpdatePageComponent', () => {
  let component: AdoptUpdatePageComponent;
  let fixture: ComponentFixture<AdoptUpdatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AdoptUpdatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptUpdatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptDetailsPageComponent } from './adopt-details-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AdoptDetailsPageComponent', () => {
  let component: AdoptDetailsPageComponent;
  let fixture: ComponentFixture<AdoptDetailsPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AdoptDetailsPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptDetailsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptListPageComponent } from './adopt-list-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AdoptListPageComponent', () => {
  let component: AdoptListPageComponent;
  let fixture: ComponentFixture<AdoptListPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AdoptListPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptListPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

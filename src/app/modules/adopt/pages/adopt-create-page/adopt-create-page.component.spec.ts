import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptCreatePageComponent } from './adopt-create-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AdoptCreatePageComponent', () => {
  let component: AdoptCreatePageComponent;
  let fixture: ComponentFixture<AdoptCreatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AdoptCreatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptCreatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

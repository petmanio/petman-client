import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterDetailsPageComponent } from './sitter-details-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SitterDetailsPageComponent', () => {
  let component: SitterDetailsPageComponent;
  let fixture: ComponentFixture<SitterDetailsPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SitterDetailsPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitterDetailsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

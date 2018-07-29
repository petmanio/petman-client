import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterListPageComponent } from './sitter-list-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SitterListPageComponent', () => {
  let component: SitterListPageComponent;
  let fixture: ComponentFixture<SitterListPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SitterListPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitterListPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

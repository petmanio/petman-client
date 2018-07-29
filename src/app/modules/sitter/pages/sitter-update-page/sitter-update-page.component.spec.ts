import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterUpdatePageComponent } from './sitter-update-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SitterUpdatePageComponent', () => {
  let component: SitterUpdatePageComponent;
  let fixture: ComponentFixture<SitterUpdatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SitterUpdatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitterUpdatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

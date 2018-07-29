import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterCreatePageComponent } from './sitter-create-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SitterCreatePageComponent', () => {
  let component: SitterCreatePageComponent;
  let fixture: ComponentFixture<SitterCreatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SitterCreatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitterCreatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

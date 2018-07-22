import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerCreatePageComponent } from './walker-create-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('WalkerCreatePageComponent', () => {
  let component: WalkerCreatePageComponent;
  let fixture: ComponentFixture<WalkerCreatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ WalkerCreatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerCreatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

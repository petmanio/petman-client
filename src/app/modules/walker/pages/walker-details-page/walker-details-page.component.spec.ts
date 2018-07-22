import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerDetailsPageComponent } from './walker-details-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('WalkerDetailsPageComponent', () => {
  let component: WalkerDetailsPageComponent;
  let fixture: ComponentFixture<WalkerDetailsPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ WalkerDetailsPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerDetailsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

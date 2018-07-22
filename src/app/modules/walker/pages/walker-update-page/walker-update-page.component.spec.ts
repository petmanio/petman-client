import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerUpdatePageComponent } from './walker-update-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('WalkerUpdatePageComponent', () => {
  let component: WalkerUpdatePageComponent;
  let fixture: ComponentFixture<WalkerUpdatePageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ WalkerUpdatePageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerUpdatePageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

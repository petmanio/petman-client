import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerListPageComponent } from './walker-list-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('WalkerListPageComponent', () => {
  let component: WalkerListPageComponent;
  let fixture: ComponentFixture<WalkerListPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ WalkerListPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerListPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

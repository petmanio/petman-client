import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WalkerEffects } from './walker.effects';

describe('WalkerService', () => {
  let actions$: Observable<any>;
  let effects: WalkerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WalkerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(WalkerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

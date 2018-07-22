import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LostFoundEffects } from './lost-found.effects';

describe('LostFoundService', () => {
  let actions$: Observable<any>;
  let effects: LostFoundEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LostFoundEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LostFoundEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

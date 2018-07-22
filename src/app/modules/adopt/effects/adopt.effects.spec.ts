import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AdoptEffects } from './adopt.effects';

describe('AdoptService', () => {
  let actions$: Observable<any>;
  let effects: AdoptEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdoptEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AdoptEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

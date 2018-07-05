import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PoiEffects } from './poi.effects';

describe('PoiService', () => {
  let actions$: Observable<any>;
  let effects: PoiEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PoiEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PoiEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

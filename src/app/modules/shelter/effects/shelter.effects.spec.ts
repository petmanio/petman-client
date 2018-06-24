import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ShelterEffects } from './shelter.effects';

describe('ShelterService', () => {
  let actions$: Observable<any>;
  let effects: ShelterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShelterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ShelterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

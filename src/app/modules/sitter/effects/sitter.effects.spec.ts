import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SitterEffects } from './sitter.effects';

describe('SitterService', () => {
  let actions$: Observable<any>;
  let effects: SitterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SitterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SitterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

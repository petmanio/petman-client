import { TestBed, async, inject } from '@angular/core/testing';

import { PoiExistsGuard } from './poi-exists.guard';

describe('PoiExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoiExistsGuard]
    });
  });

  it('should ...', inject([PoiExistsGuard], (guard: PoiExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});

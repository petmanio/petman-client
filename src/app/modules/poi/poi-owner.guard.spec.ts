import { TestBed, async, inject } from '@angular/core/testing';

import { PoiOwnerGuard } from './poi-owner.guard';

describe('PoiOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoiOwnerGuard]
    });
  });

  it('should ...', inject([PoiOwnerGuard], (guard: PoiOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

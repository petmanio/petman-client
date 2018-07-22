import { TestBed, async, inject } from '@angular/core/testing';

import { LostFoundOwnerGuard } from './lost-found-owner.guard';

describe('LostFoundOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LostFoundOwnerGuard]
    });
  });

  it('should ...', inject([LostFoundOwnerGuard], (guard: LostFoundOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

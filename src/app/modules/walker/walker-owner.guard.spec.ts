import { TestBed, async, inject } from '@angular/core/testing';

import { WalkerOwnerGuard } from './walker-owner.guard';

describe('WalkerOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalkerOwnerGuard]
    });
  });

  it('should ...', inject([WalkerOwnerGuard], (guard: WalkerOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

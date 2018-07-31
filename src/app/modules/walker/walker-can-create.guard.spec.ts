import { TestBed, async, inject } from '@angular/core/testing';

import { WalkerCanCreateGuard } from './walker-can-create.guard';

describe('WalkerCanCreateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalkerCanCreateGuard]
    });
  });

  it('should ...', inject([WalkerCanCreateGuard], (guard: WalkerCanCreateGuard) => {
    expect(guard).toBeTruthy();
  }));
});

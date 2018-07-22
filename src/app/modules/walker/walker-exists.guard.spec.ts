import { TestBed, async, inject } from '@angular/core/testing';

import { WalkerExistsGuard } from './walker-exists.guard';

describe('WalkerExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalkerExistsGuard]
    });
  });

  it('should ...', inject([WalkerExistsGuard], (guard: WalkerExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});

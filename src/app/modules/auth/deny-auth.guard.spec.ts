import { TestBed, async, inject } from '@angular/core/testing';

import { DenyAuthGuard } from './deny-auth.guard';

describe('DenyAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DenyAuthGuard]
    });
  });

  it('should ...', inject([DenyAuthGuard], (guard: DenyAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { SitterOwnerGuard } from './sitter-owner.guard';

describe('SitterOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitterOwnerGuard]
    });
  });

  it('should ...', inject([SitterOwnerGuard], (guard: SitterOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

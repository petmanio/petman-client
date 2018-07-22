import { TestBed, async, inject } from '@angular/core/testing';

import { AdoptOwnerGuard } from './adopt-owner.guard';

describe('AdoptOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptOwnerGuard]
    });
  });

  it('should ...', inject([AdoptOwnerGuard], (guard: AdoptOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

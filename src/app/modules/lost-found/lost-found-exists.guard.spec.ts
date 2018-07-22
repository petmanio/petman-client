import { TestBed, async, inject } from '@angular/core/testing';

import { LostFoundExistsGuard } from './lost-found-exists.guard';

describe('LostFoundExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LostFoundExistsGuard]
    });
  });

  it('should ...', inject([LostFoundExistsGuard], (guard: LostFoundExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});

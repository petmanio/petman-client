import { TestBed, async, inject } from '@angular/core/testing';

import { AdoptExistsGuard } from './adopt-exists.guard';

describe('AdoptExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptExistsGuard]
    });
  });

  it('should ...', inject([AdoptExistsGuard], (guard: AdoptExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});

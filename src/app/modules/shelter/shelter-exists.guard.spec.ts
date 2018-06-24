import { TestBed, async, inject } from '@angular/core/testing';

import { ShelterExistsGuard } from './shelter-exists.guard';

describe('ShelterExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShelterExistsGuard]
    });
  });

  it('should ...', inject([ShelterExistsGuard], (guard: ShelterExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { ShelterOwnerGuard } from './shelter-owner.guard';

describe('ShelterOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShelterOwnerGuard]
    });
  });

  it('should ...', inject([ShelterOwnerGuard], (guard: ShelterOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { OrganizationOwnerGuard } from './organization-owner.guard';

describe('OrganizationOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationOwnerGuard]
    });
  });

  it('should ...', inject([OrganizationOwnerGuard], (guard: OrganizationOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

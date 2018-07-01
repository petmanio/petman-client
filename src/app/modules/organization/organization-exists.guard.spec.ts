import { TestBed, async, inject } from '@angular/core/testing';

import { OrganizationExistsGuard } from './organization-exists.guard';

describe('OrganizationExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationExistsGuard]
    });
  });

  it('should ...', inject([OrganizationExistsGuard], (guard: OrganizationExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});

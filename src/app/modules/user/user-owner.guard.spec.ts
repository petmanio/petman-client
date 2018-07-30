import { TestBed, async, inject } from '@angular/core/testing';

import { UserOwnerGuard } from './user-owner.guard';

describe('UserOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserOwnerGuard]
    });
  });

  it('should ...', inject([UserOwnerGuard], (guard: UserOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});

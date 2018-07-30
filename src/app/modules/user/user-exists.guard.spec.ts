import { TestBed, async, inject } from '@angular/core/testing';

import { UserExistsGuard } from './user-exists.guard';

describe('UserExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserExistsGuard]
    });
  });

  it('should ...', inject([UserExistsGuard], (guard: UserExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});

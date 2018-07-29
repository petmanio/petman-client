import { TestBed, async, inject } from '@angular/core/testing';

import { SitterExistsGuard } from './sitter-exists.guard';

describe('SitterExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitterExistsGuard]
    });
  });

  it('should ...', inject([SitterExistsGuard], (guard: SitterExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});

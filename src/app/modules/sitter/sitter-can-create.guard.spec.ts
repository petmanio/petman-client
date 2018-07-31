import { TestBed, async, inject } from '@angular/core/testing';

import { SitterCanCreateGuard } from './sitter-can-create.guard';

describe('SitterCanCreateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitterCanCreateGuard]
    });
  });

  it('should ...', inject([SitterCanCreateGuard], (guard: SitterCanCreateGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { SitterService } from './sitter.service';

describe('SitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitterService]
    });
  });

  it('should be created', inject([SitterService], (service: SitterService) => {
    expect(service).toBeTruthy();
  }));
});

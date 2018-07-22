import { TestBed, inject } from '@angular/core/testing';

import { AdoptService } from './adopt.service';

describe('AdoptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptService]
    });
  });

  it('should be created', inject([AdoptService], (service: AdoptService) => {
    expect(service).toBeTruthy();
  }));
});

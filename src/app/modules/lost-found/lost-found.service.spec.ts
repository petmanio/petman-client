import { TestBed, inject } from '@angular/core/testing';

import { LostFoundService } from './lost-found.service';

describe('LostFoundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LostFoundService]
    });
  });

  it('should be created', inject([LostFoundService], (service: LostFoundService) => {
    expect(service).toBeTruthy();
  }));
});

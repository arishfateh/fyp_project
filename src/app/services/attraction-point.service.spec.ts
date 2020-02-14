import { TestBed } from '@angular/core/testing';

import { AttractionPointService } from './attraction-point.service';

describe('AttractionPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttractionPointService = TestBed.get(AttractionPointService);
    expect(service).toBeTruthy();
  });
});

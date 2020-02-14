import { TestBed } from '@angular/core/testing';

import { StayPointService } from './stay-point.service';

describe('StayPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StayPointService = TestBed.get(StayPointService);
    expect(service).toBeTruthy();
  });
});

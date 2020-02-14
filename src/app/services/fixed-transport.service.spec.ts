import { TestBed } from '@angular/core/testing';

import { FixedTransportService } from './fixed-transport.service';

describe('FixedTransportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FixedTransportService = TestBed.get(FixedTransportService);
    expect(service).toBeTruthy();
  });
});

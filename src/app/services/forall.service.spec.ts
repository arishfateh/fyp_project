import { TestBed } from '@angular/core/testing';

import { ForallService } from './forall.service';

describe('ForallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForallService = TestBed.get(ForallService);
    expect(service).toBeTruthy();
  });
});

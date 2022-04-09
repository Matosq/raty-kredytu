import { TestBed } from '@angular/core/testing';

import { CostsDataService } from './costs-data.service';

describe('CostsDataService', () => {
  let service: CostsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

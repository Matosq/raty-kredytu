import { TestBed } from '@angular/core/testing';

import { DatePeriodIndexerService } from './date-period-indexer.service';

describe('DatePeriodIndexerService', () => {
  let service: DatePeriodIndexerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePeriodIndexerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

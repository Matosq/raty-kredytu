import { TestBed } from '@angular/core/testing';

import { OverpaymentsDataService } from './overpayments-data.service';

describe('OverpaymentsDataService', () => {
  let service: OverpaymentsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverpaymentsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OverpaymentsService } from './overpayments.service';

describe('OverpaymentsService', () => {
  let service: OverpaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverpaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

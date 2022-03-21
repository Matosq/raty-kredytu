import { TestBed } from '@angular/core/testing';

import { LoanParametersService } from './loan-parameters.service';

describe('LoanParametersService', () => {
  let service: LoanParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

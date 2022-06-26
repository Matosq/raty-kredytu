import { TestBed } from '@angular/core/testing';

import { TranchesDataService } from './tranches-data.service';

describe('TranchesDataService', () => {
  let service: TranchesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranchesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

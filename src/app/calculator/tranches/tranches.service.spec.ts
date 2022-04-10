import { TestBed } from '@angular/core/testing';

import { TranchesService } from './tranches.service';

describe('TranchesService', () => {
  let service: TranchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

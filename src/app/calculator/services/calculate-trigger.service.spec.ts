import { TestBed } from '@angular/core/testing';

import { CalculateTriggerService } from './calculate-trigger.service';

describe('CalculateTriggerService', () => {
  let service: CalculateTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DistributorhistoryService } from './distributorhistory.service';

describe('DistributorhistoryService', () => {
  let service: DistributorhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributorhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OnlineSaleService } from './online-sale.service';

describe('OnlineSaleService', () => {
  let service: OnlineSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

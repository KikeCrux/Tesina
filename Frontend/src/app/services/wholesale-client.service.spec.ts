import { TestBed } from '@angular/core/testing';

import { WholesaleClientService } from './wholesale-client.service';

describe('WholesaleClientService', () => {
  let service: WholesaleClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WholesaleClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CurdService } from './curd.service';

describe('CurdService', () => {
  let service: CurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

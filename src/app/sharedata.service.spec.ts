import { TestBed } from '@angular/core/testing';

import { SharedataService } from './sharedata.service';

describe('SharedataService', () => {
  let service: SharedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

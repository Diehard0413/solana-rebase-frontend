import { TestBed } from '@angular/core/testing';

import { CovaService } from './cova.service';

describe('CovaService', () => {
  let service: CovaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

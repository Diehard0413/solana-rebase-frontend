import { TestBed } from '@angular/core/testing';

import { NgxColorConverterService } from './ngx-color-converter.service';

describe('NgxColorConverterService', () => {
  let service: NgxColorConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxColorConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

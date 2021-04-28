import { TestBed } from '@angular/core/testing';

import { ProvinceCityCountyService } from './province-city-county.service';

describe('ProvinceCityCountyService', () => {
  let service: ProvinceCityCountyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinceCityCountyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

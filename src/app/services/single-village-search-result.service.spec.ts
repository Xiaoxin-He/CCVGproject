import { TestBed } from '@angular/core/testing';

import { SingleVillageSearchResultService } from './single-village-search-result.service';

describe('SingleVillageSearchResultService', () => {
  let service: SingleVillageSearchResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleVillageSearchResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

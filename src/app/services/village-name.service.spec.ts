import { TestBed } from '@angular/core/testing';

import { VillageNameService } from './village-name.service';

describe('VillagenameServiseService', () => {
  let service: VillageNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VillageNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

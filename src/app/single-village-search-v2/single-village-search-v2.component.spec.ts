import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVillageSearchV2Component } from './single-village-search-v2.component';

describe('SingleVillageSearchV2Component', () => {
  let component: SingleVillageSearchV2Component;
  let fixture: ComponentFixture<SingleVillageSearchV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleVillageSearchV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVillageSearchV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVillageSearchResultComponent } from './single-village-search-result.component';

describe('SingleVillageSearchResultComponent', () => {
  let component: SingleVillageSearchResultComponent;
  let fixture: ComponentFixture<SingleVillageSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleVillageSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVillageSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

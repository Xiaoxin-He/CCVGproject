import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMultiVillagesComponent } from './search-multi-villages.component';

describe('SearchMultiVillagesComponent', () => {
  let component: SearchMultiVillagesComponent;
  let fixture: ComponentFixture<SearchMultiVillagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMultiVillagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMultiVillagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

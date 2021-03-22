import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiVillageSearchComponent } from './multi-village-search.component';

describe('MultiVillageSearchComponent', () => {
  let component: MultiVillageSearchComponent;
  let fixture: ComponentFixture<MultiVillageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiVillageSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiVillageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

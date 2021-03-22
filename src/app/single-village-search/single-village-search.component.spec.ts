import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVillageSearchComponent } from './single-village-search.component';

describe('SingleVillageSearchComponent', () => {
  let component: SingleVillageSearchComponent;
  let fixture: ComponentFixture<SingleVillageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleVillageSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVillageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDisplayV22Component } from './table-display-v22.component';

describe('TableDisplayV22Component', () => {
  let component: TableDisplayV22Component;
  let fixture: ComponentFixture<TableDisplayV22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDisplayV22Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDisplayV22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDisplayV23Component } from './table-display-v23.component';

describe('TableDisplayV23Component', () => {
  let component: TableDisplayV23Component;
  let fixture: ComponentFixture<TableDisplayV23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDisplayV23Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDisplayV23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

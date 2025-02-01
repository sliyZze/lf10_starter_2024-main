import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSortEmployeeComponentComponent } from './filter-sort-employee-component.component';

describe('FilterSortEmployeeComponentComponent', () => {
  let component: FilterSortEmployeeComponentComponent;
  let fixture: ComponentFixture<FilterSortEmployeeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSortEmployeeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSortEmployeeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

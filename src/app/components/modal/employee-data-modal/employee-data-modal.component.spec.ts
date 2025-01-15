import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataModalComponent } from './employee-data-modal.component';

describe('EmployeeDataModalComponent', () => {
  let component: EmployeeDataModalComponent;
  let fixture: ComponentFixture<EmployeeDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDataModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

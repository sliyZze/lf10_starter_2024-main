import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationModalComponent } from './qualificationModal.component';

describe('QualificationComponent', () => {
  let component: QualificationModalComponent;
  let fixture: ComponentFixture<QualificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

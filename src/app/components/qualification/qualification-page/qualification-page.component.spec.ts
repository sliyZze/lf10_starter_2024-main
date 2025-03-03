import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationPageComponent } from './qualification-page.component';

describe('QualificationPageComponent', () => {
  let component: QualificationPageComponent;
  let fixture: ComponentFixture<QualificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

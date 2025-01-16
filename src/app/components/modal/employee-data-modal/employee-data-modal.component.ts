import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EditEmployeeService} from "../../services/EmployeeEditService";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-employee-data-modal',
    imports: [FormsModule],
    templateUrl: './employee-data-modal.component.html',
    styleUrl: './employee-data-modal.component.css'
})
export class EmployeeDataModalComponent {
  private modalRef?: NgbModalRef;
    private subscription!: Subscription;
  @ViewChild('EmployeeDataModal') EmployeeDataModal!: TemplateRef<any>;
  @Input() title: string = "";

  constructor(private modalService: NgbModal, private editEmployeeService: EditEmployeeService) {}

  ngOnInit(): void {
    this.subscription = this.editEmployeeService.getValue().subscribe((value: boolean) => {
      if (value && !this.modalRef) {
        this.openModal(this.EmployeeDataModal);
      } else if (!value && this.modalRef) {
        this.closeModal();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModal(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  closeModal() {
    this.modalRef?.close();
    this.modalRef = undefined;
  }
}

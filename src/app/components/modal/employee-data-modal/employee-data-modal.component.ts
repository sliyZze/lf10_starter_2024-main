import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-employee-data-modal',
  imports: [FormsModule],
  templateUrl: './employee-data-modal.component.html',
  standalone: true,
  styleUrl: './employee-data-modal.component.css'
})
export class EmployeeDataModalComponent {
  private modalRef?: NgbModalRef;
    private subscription!: Subscription;
  @ViewChild('EmployeeDataModal') EmployeeDataModal!: TemplateRef<any>;
  @Input() title: string = "";
  @Input() service: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    if (this.service) {
      this.subscription = this.service.getValue().subscribe((value: boolean) => {
        if (value && !this.modalRef) {
          this.openModal(this.EmployeeDataModal);
        } else if (!value && this.modalRef) {
          this.closeModal();
        }
      });
    }
  }

  openModal(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      centered: true,
      backdrop: "static",
      keyboard: false
    });
  }

  closeModal() {
    this.modalRef?.close();
    this.modalRef = undefined;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

import {Component} from '@angular/core';
import {MainHeaderComponent} from '../../header/main-header/main-header.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditEmployeeService} from "../../services/EmployeeEditService";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../modal/alert/alert.component";

@Component({
  selector: 'app-employee-table',
  imports: [
    MainHeaderComponent,
    NgIf,
    FormsModule,
    EditEmployeeComponent,
    ModalComponent
  ],
  standalone: true,
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {
  page: string = '';
  isValid: boolean = true;
  private modalRaf: NgbModalRef | undefined;

  constructor(private editEmployeeService: EditEmployeeService, private modalService: NgbModal) {
  }

  openModal(content: any) {
    this.modalRaf = this.modalService.open(content, { centered: true });
  }


  onEditEmployee(){
    this.editEmployeeService.setValue(true)
  }

  validatePageInput() {
    return this.isValid = !isNaN(Number(this.page)) && this.page.trim() !== '' || this.page.length == 0;
  }
}

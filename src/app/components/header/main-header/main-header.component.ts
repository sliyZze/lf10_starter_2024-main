import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from "../../services/NavigationService";
import {QualificationTargetService} from "../../services/QualificationTargetService";
import {FormsModule} from "@angular/forms";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-main-header',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit{
  selectedOption: string | undefined;

  constructor(private navigationService: NavigationService, private qualificationTargetService: QualificationTargetService, private keycloakService: KeycloakService) {}

  logout(): void {
     this.keycloakService.logout('http://localhost:4200/login');
  }

  ngOnInit() {
    this.selectedOption = this.qualificationTargetService.getValue();
    this.updateSelectedOption(this.selectedOption);
  }

  employeeAdministration(event: Event) {
    const targetString = (event.target as HTMLSelectElement).value;

      this.updateSelectedOption(targetString);

    if (targetString === "Qualifikationen") {
      this.navigationService.redirectQualificationPage();
    } else {
      this.navigationService.redirectToEmployeeTable();
    }
  }

  private updateSelectedOption(targetString: string) {
    this.qualificationTargetService.setValue(targetString);

    if (targetString === "Qualifikationen") {
      console.log(this.qualificationTargetService.getValue());
    } else {
      console.log(this.qualificationTargetService.getValue());
    }
  }
}

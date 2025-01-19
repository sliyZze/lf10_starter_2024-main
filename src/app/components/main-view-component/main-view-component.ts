import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-view-component',
  imports: [
    RouterOutlet
  ],
  templateUrl: './main-view-component.html',
  standalone: true,
  styleUrl: './main-view-component.css'
})
export class MainViewComponent {

}

import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-view-component',
  imports: [
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './main-view-component.html',
  styleUrl: './main-view-component.css'
})
export class MainViewComponent {

}

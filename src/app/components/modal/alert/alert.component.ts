import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-alert',
    imports: [],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css'
})
export class ModalComponent {
  @Input() body: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}

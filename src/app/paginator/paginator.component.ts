import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-paginator',
  imports: [
    MatPaginator
  ],
  templateUrl: './paginator.component.html',
  standalone: true,
  styleUrl: './paginator.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent {
  @Input() totalitems: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  onPageChange(pageEvent: PageEvent) {
    this.pageChanged.emit(pageEvent)
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input()
  totalPages: number = 0;

  @Input()
  currentPage: number = 0;

  @Output()
  onNextClicked = new EventEmitter<void>();

  @Output()
  onPrevClicked = new EventEmitter<void>();
}

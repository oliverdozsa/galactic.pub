import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() maxPagesShown = 4;
  @Input() totalPages: number = 1;
  @Output() selectedPage = new EventEmitter<number>();

  pages: number[] = [];

  get hasPrev(): boolean {
    return this.current > 1;
  }

  get hasNext(): boolean {
    return this.current < this.totalPages;
  }

  @Input() set current(value: number) {
    this._current = value;
    this.adjustPagesAccordingToCurrent();
  }

  get current() {
    return this._current;
  }

  private _current: number = 1;

  constructor() {
  }

  ngOnInit(): void {
    this.pages = Array.from({length: this.maxPagesShown}, (v, i) => i + 1);
    this.pages[0] = 1;
    this.adjustPagesAccordingToCurrent();
  }

  onNext() {
    if (this.current < this.totalPages) {
      this.selectedPage.next(this.current + 1);
    }
  }

  onPrev() {
    if (this.current > 1) {
      this.selectedPage.next(this.current - 1);
    }
  }

  onPageNumberSelected(selectedPage: number) {
    if (this.current !== selectedPage) {
      this.selectedPage.next(selectedPage);
    }
  }

  private adjustPagesAccordingToCurrent() {
    let pagesToShow = this.maxPagesShown;
    if(this.current > this.totalPages - this.totalPages % this.maxPagesShown) {
      pagesToShow = this.totalPages % this.maxPagesShown;
    }

    const startPage = this.current - ((this.current - 1) % this.maxPagesShown);
    this.pages = Array.from({length: pagesToShow}, (v, i) => startPage + i);
  }
}

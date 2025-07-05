import {Component, inject} from '@angular/core';
import {Toast, ToastsService, ToastType} from '../../services/toasts.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-toasts',
  imports: [
    NgForOf
  ],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css'
})
export class ToastsComponent {
  toastsService = inject(ToastsService);

  classOf(toast: Toast) {
    if(toast.type == ToastType.Success) {
      return "alert-success";
    } else if(toast.type == ToastType.Error) {
      return "alert-error";
    } else {
      return "alert-info";
    }
  }
}

import { Component } from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {ToastKind} from "../../services/toast";
import {fadeOutOnLeaveAnimation} from "angular-animations";

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  animations: [
    fadeOutOnLeaveAnimation({duration: 400})
  ]
})
export class ToastsComponent {
  ToastKind = ToastKind;

  constructor(public toastService: ToastService) {
  }
}

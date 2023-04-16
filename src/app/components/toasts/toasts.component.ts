import { Component } from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {ToastKind} from "../../services/toast";

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {
  ToastKind = ToastKind;

  constructor(public toastService: ToastService) {
    toastService.error("not good")
    toastService.warning("something's fishy")
    toastService.success("yay")
  }
}

import {Injectable} from '@angular/core';
import {Toast, ToastKind} from "./toast";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];

  private deleteTimeouts: any[] = [];
  private toastId: number = 1;

  private static AliveSecs = 5;

  constructor() {
  }

  success(message: string) {
    this.pushToast(ToastKind.Success, message);
  }

  error(message: string) {
    this.pushToast(ToastKind.Error, message);
  }

  warning(message: string) {
    this.pushToast(ToastKind.Warning, message);
  }

  deleteToast(toast: Toast) {
    const position = this.toasts.findIndex(t => t.id == toast.id);
    if (position > -1) {
      clearTimeout(this.deleteTimeouts[position]);
      this.deleteTimeouts.splice(position, 1);
      this.toasts.splice(position, 1);
    }
  }

  private pushToast(kind: ToastKind, message: string) {
    this.toastId++;
    const toast: Toast = {kind: kind, message: message, id: this.toastId};

    const deleteTimeout = setTimeout(() => this.deleteToast(toast), ToastService.AliveSecs * 1000);

    this.toasts.push(toast);
    this.deleteTimeouts.push(deleteTimeout)
  }
}

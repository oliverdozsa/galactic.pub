import {Injectable} from '@angular/core';

export interface Toast {
  message: string,
  type: ToastType
}

export enum ToastType {
  Success,
  Error
}

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private static generatedId = 0;

  private pushedToasts: PushedToast[] = [];

  get toasts() {
    return this.pushedToasts.map(p => p.toast);
  }

  push(toast: Toast) {
    const id = ToastsService.generatedId++;
    this.pushedToasts.push(new PushedToast(toast, id));

    setTimeout(() => this.removeToastWithId(id), 4200);
  }

  removeToastWithId(id: number) {
    this.pushedToasts = this.pushedToasts.filter(t => t.id != id);
  }
}

class PushedToast {
  constructor(public toast: Toast, public id: number) {
  }
}

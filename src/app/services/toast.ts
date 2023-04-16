export enum ToastKind {
  Success,
  Error,
  Warning
}

export interface Toast {
  kind: ToastKind,
  message: string,
  readonly id: number
}

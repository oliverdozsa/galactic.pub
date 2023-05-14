import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

enum CurrentTheme {
  Light,
  Dark,
  Undefined
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeChanged$: Subject<any> = new Subject<any>();
  currentColors: any;

  private current: CurrentTheme = CurrentTheme.Undefined;

  switchedToDark() {
    if (this.current == CurrentTheme.Dark) {
      return;
    }

    this.current = CurrentTheme.Dark;

    this.currentColors = {
      fgText: '#b4c6ef',
      bg: '#0f172a',
      separator: '#b4c6ef',
    };

    this.themeChanged$.next(this.currentColors);
  }

  switchedToLight() {
    if (this.current == CurrentTheme.Light) {
      return;
    }

    this.current = CurrentTheme.Light;

    this.currentColors = {
      fgText: '#1f2937',
      bg: '#ffffff',
      separator: '#1f2937',
    };

    this.themeChanged$.next(this.currentColors);
  }

  constructor() {
  }
}

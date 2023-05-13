import {Component} from '@angular/core';
import {AppRoutes} from "./app-routes";
import {AuthService} from "@auth0/auth0-angular";
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  AppRoutes = AppRoutes;

  title = 'galactic-pub';

  get isLightTheme() {
    return this._isLightTheme;
  }

  set isLightTheme(value: boolean) {
    this._isLightTheme = value;
    if (this._isLightTheme) {
      this.themeService.switchedToLight()
    } else {
      this.themeService.switchedToDark();
    }
  }

  protected readonly document = document;

  private _isLightTheme: boolean = localStorage.getItem("theme") != null && localStorage.getItem("theme") == "light";

  constructor(public auth: AuthService, private themeService: ThemeService) {
    setTimeout(() => {
      if (this._isLightTheme) {
        this.themeService.switchedToLight();
      } else {
        this.themeService.switchedToDark();
      }
    })
  }
}

import {Component} from '@angular/core';
import {AppRoutes} from "./app-routes";
import {AuthService} from "@auth0/auth0-angular";

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
  }

  private _isLightTheme: boolean = localStorage.getItem("theme") != null && localStorage.getItem("theme") == "light";

  constructor(public auth: AuthService) {
  }

  protected readonly document = document;
}

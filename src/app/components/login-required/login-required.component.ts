import {Component, Input} from '@angular/core';
import {AuthenticationState} from "../../data/authentication-state";
import {AppAuthService} from "../../services/app-auth.service";

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss']
})
export class LoginRequiredComponent {
  @Input()
  text: string = "";

  constructor(public appAuth: AppAuthService) {
  }

  login() {
    this.appAuth.loginThroughAuth0();
  }

  protected readonly AuthenticationState = AuthenticationState;
}

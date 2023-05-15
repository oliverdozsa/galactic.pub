import {Component, Input} from '@angular/core';
import {AuthenticationState} from "../../data/authentication-state";
import {CheckAuthService} from "../../services/check-auth.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss']
})
export class LoginRequiredComponent {
  @Input()
  text: string = "";

  authState: AuthenticationState = AuthenticationState.CHECKING;

  constructor(public checkAuth: CheckAuthService, public auth: AuthService) {
    checkAuth.isAuthenticated$.subscribe({
      next: isAuth => this.authState = isAuth ? AuthenticationState.AUTHENTICATED : AuthenticationState.UNAUTHENTICATED
    });
  }

  protected readonly AuthenticationState = AuthenticationState;
}

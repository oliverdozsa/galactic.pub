import {Component, Input} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {AuthenticationState} from "../../data/authentication-state";

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss']
})
export class LoginRequiredComponent {
  @Input()
  text: string = "";

  authState: AuthenticationState = AuthenticationState.CHECKING;

  constructor(public auth: AuthService) {
    auth.isAuthenticated$.subscribe({
      next: isAuth => this.authState = isAuth ? AuthenticationState.AUTHENTICATED : AuthenticationState.UNAUTHENTICATED
    });
  }

  protected readonly AuthenticationState = AuthenticationState;
}

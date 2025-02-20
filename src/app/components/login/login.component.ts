import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);

  get picture() {
    return this.authService.getProfile()["picture"];
  }

  get name() {
    return this.authService.getProfile()["name"];
  }

  onLoginClicked() {
    this.authService.login();
  }

  onLogoutClicked() {
    this.authService.logout();
  }
}

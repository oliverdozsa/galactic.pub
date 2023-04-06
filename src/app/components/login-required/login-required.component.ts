import {Component, Input} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss']
})
export class LoginRequiredComponent {
  @Input()
  text: string = "";

  constructor(public auth: AuthService) {
  }
}

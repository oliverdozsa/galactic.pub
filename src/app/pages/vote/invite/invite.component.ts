import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenAuthService} from "../../../services/token-auth.service";
import {AppRoutes} from "../../../app-routes";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent {
  isLoading = true;

  private token: string | undefined;

  constructor(private route: ActivatedRoute, private tokenAuthService: TokenAuthService, private router: Router) {
    this.token = route.snapshot.paramMap.get("token")!;
    this.loginThroughToken();
  }

  private loginThroughToken() {
    this.tokenAuthService.authenticateThrough(this.token!)
      .subscribe({
        next: () => this.onAuthenticated()
      });
  }

  private onAuthenticated() {
    this.router.navigate(["/" + AppRoutes.LETS_VOTE])
  }
}

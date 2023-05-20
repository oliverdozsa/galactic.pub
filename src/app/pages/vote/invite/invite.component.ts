import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenAuthService} from "../../../services/token-auth.service";
import {AppRoutes} from "../../../app-routes";
import {Subject, takeUntil} from "rxjs";
import {AppAuthService} from "../../../services/app-auth.service";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnDestroy {
  isLoading = true;

  private token: string | undefined;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private tokenAuth: TokenAuthService,
              private appAuth: AppAuthService, private router: Router) {
    this.token = route.snapshot.paramMap.get("token")!;
    this.loginThroughToken();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loginThroughToken() {
    const subscription = this.tokenAuth.jwt$
      .subscribe({
        next: () => {
          subscription.unsubscribe();
          this.onAuthenticated();
        }
      });

    this.appAuth.loginThroughToken(this.token!);
  }

  private onAuthenticated() {
    this.router.navigate(["/" + AppRoutes.LETS_VOTE]);
  }
}

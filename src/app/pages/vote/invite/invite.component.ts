import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenAuthService} from "../../../services/token-auth.service";
import {AppRoutes} from "../../../app-routes";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnDestroy {
  isLoading = true;

  private token: string | undefined;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private tokenAuthService: TokenAuthService, private router: Router) {
    this.token = route.snapshot.paramMap.get("token")!;
    this.loginThroughToken();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loginThroughToken() {
    this.tokenAuthService.authenticateThrough(this.token!);
    this.tokenAuthService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: isAuth => this.onAuthenticated(isAuth)
      });
  }

  private onAuthenticated(isAuth: boolean) {
    this.router.navigate(["/" + AppRoutes.LETS_VOTE]);
    // TODO: handle isAuth = false;
  }
}

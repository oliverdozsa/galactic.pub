import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {finalize, map, Observable, Subject, tap} from "rxjs";
import jwtDecode from "jwt-decode";

interface InviteBasedToken {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {
  private static BASE_URL = environment.apiUrl + "/tokenauth";

  isAuthenticated$ = new Subject<boolean>();
  jwt$ = new Subject<string>();
  isActive: boolean = false;

  constructor(private httpClient: HttpClient) {
    if (this.has()) {
      if (this.isExpired()) {
        this.clear();
      } else {
        const invitationToken = this.read();
        this.watch(invitationToken);
        this.isAuthenticated$.next(true);
        this.jwt$.next(invitationToken.token)
      }
    }
  }

  authenticateThrough(token: string) {
    const subscription = this.httpClient.get<InviteBasedToken>(TokenAuthService.BASE_URL + `/${token}`)
      .subscribe({
        next: t => {
          subscription.unsubscribe();
          this.onTokenReceived(t);
        }
      });
  }

  logout() {
    this.clear();
  }

  private onTokenReceived(token: InviteBasedToken) {
    this.isAuthenticated$.next(true);
    this.jwt$.next(token.token);
    this.store(token);
    this.watch(token)
  }

  private watch(token: InviteBasedToken) {
    const jwt: any = jwtDecode(token.token);
    const expiryMillis = new Date(jwt["exp"] * 1000).valueOf() - Date.now();

    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      this.clear();
    }, expiryMillis);
  }

  private store(token: InviteBasedToken) {
    localStorage.setItem("invitationToken", JSON.stringify(token));
  }

  private clear() {
    this.isActive = false;
    localStorage.removeItem("invitationToken");
    this.isAuthenticated$.next(false);
  }

  private has() {
    return localStorage.getItem("invitationToken") != null;
  }

  private isExpired(): boolean {
    if (!this.has()) {
      return true;
    }

    const invitationToken = this.read();
    const jwtStr = invitationToken.token;

    const jwt: any = jwtDecode(jwtStr);

    const expiryDateMillis = new Date(jwt["exp"] * 1000).valueOf();
    const nowMillis = Date.now();

    return expiryDateMillis <= nowMillis;
  }

  private read() {
    const tokenJsonStr = localStorage.getItem("invitationToken");
    return JSON.parse(tokenJsonStr!) as InviteBasedToken;
  }
}

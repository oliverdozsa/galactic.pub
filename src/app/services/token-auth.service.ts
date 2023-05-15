import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {finalize, map, Observable, tap} from "rxjs";

export interface InviteBasedToken {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {
  private static BASE_URL = environment.apiUrl + "/tokenauth";

  token: InviteBasedToken | undefined;

  get isAuthenticated() {
    return this.token != undefined;
  }

  constructor(private httpClient: HttpClient) {
  }

  authenticateThrough(token: string): Observable<any> {
    return this.httpClient.get<InviteBasedToken>(TokenAuthService.BASE_URL + `/${token}`)
      .pipe(
        tap(t => this.token = t)
      );
  }

  logout() {
    this.token = undefined;
  }
}

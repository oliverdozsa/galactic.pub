import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet, NavigationEnd} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);

  get currentYear() {
    return new Date().getFullYear();
  }

  constructor(router: Router) {
    if(!this.authService.isLoggedIn) {
      const lastVisitedUrl = localStorage.getItem("lastVisitedUrl");
      if (lastVisitedUrl) {
        localStorage.removeItem("lastVisitedUrl");
        router.navigateByUrl(lastVisitedUrl);
      }
    } else {
      this.authService.authEvent.subscribe({
        next: () => {
          const lastVisitedUrl = localStorage.getItem("lastVisitedUrl");
          if (lastVisitedUrl) {
            localStorage.removeItem("lastVisitedUrl");
            router.navigateByUrl(lastVisitedUrl);
          }
        }
      })
    }

    router.events.subscribe(e => this.handleRouterEvent(e));
  }

  private handleRouterEvent(event: any) {
    if (event instanceof NavigationEnd) {
      localStorage.setItem("lastVisitedUrl", event.url);
    }
  }
}

import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet, RouterEvent, NavigationEnd} from '@angular/router';
import {LoginComponent} from './components/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  get currentYear() {
    return new Date().getFullYear();
  }

  constructor(router: Router) {
    const lastVisitedUrl = localStorage.getItem("lastVisitedUrl");
    if(lastVisitedUrl) {
      localStorage.removeItem("lastVisitedUrl");
      router.navigateByUrl(lastVisitedUrl);
    }

    router.events.subscribe(e => this.handleRouterEvent(e));
  }

  private handleRouterEvent(event: any) {
    if(event instanceof NavigationEnd) {
      localStorage.setItem("lastVisitedUrl", event.url);
    }
  }
}

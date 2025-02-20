import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoginComponent} from './components/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'galacic.pub';
}

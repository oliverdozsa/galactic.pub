import {Component, inject} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {NotLoggedInComponent} from '../../../components/not-logged-in/not-logged-in.component';

@Component({
  selector: 'app-my-created-votings',
  imports: [
    NgIf,
    NotLoggedInComponent
  ],
  templateUrl: './my-created-votings.component.html',
  styleUrl: './my-created-votings.component.css'
})
export class MyCreatedVotingsComponent {
  authService = inject(AuthService);
}

import {Component, inject} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {NotLoggedInComponent} from '../../../components/not-logged-in/not-logged-in.component';

@Component({
  selector: 'app-votings-where-iparticipate',
  imports: [
    NgIf,
    NotLoggedInComponent
  ],
  templateUrl: './votings-where-iparticipate.component.html',
  styleUrl: './votings-where-iparticipate.component.css'
})
export class VotingsWhereIParticipateComponent {
  authService = inject(AuthService);
}

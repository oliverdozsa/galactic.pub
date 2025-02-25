import {Component, inject} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {NotLoggedInComponent} from '../../../components/not-logged-in/not-logged-in.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-voting',
  imports: [
    NotLoggedInComponent,
    NgIf
  ],
  templateUrl: './create-voting.component.html',
  styleUrl: './create-voting.component.css'
})
export class CreateVotingComponent {
  authService = inject(AuthService);
}

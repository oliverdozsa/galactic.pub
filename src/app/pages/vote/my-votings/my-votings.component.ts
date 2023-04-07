import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {PagingSource} from "../../../services/votings.service";
import {AppRoutes} from "../../../app-routes";

@Component({
  selector: 'app-my-votings',
  templateUrl: './my-votings.component.html',
  styleUrls: ['./my-votings.component.scss']
})
export class MyVotingsComponent {
  AppRoutes = AppRoutes;

  protected readonly PagingSource = PagingSource;

  constructor(public auth: AuthService, private router: Router) {
  }

  onCreateVotingClicked() {
    this.router.navigateByUrl(`/${AppRoutes.CREATE_VOTING}`);
  }
}

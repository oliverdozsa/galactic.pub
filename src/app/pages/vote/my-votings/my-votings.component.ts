import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PagingSource} from "../../../services/votings.service";
import {AppRoutes} from "../../../app-routes";
import {AppAuthService} from "../../../services/app-auth.service";

@Component({
  selector: 'app-my-votings',
  templateUrl: './my-votings.component.html',
  styleUrls: ['./my-votings.component.scss']
})
export class MyVotingsComponent {
  protected readonly PagingSource = PagingSource;

  constructor(public appAuth: AppAuthService, private router: Router) {
  }

  onCreateVotingClicked() {
    this.router.navigateByUrl(`/${AppRoutes.CREATE_VOTING}`);
  }
}

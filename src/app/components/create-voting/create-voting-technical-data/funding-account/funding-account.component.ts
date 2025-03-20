import {Component} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-funding-account',
  imports: [
    NgIf
  ],
  templateUrl: './funding-account.component.html',
  styleUrl: './funding-account.component.css'
})
export class FundingAccountComponent {
  isValid = false;
}

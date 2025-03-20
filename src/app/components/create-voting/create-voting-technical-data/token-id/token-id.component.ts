import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-token-id',
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './token-id.component.html',
  styleUrl: './token-id.component.css'
})
export class TokenIdComponent {
  isValid = false;
}

import {AfterViewInit, Component, OnDestroy} from '@angular/core';

declare var LeaderLine: any;

@Component({
  selector: 'app-not-logged-in',
  imports: [],
  templateUrl: './not-logged-in.component.html',
  styleUrl: './not-logged-in.component.css'
})
export class NotLoggedInComponent implements AfterViewInit, OnDestroy {
  private line: any;

  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit`)
    this.line = new LeaderLine(document.querySelector("#need-to-login"), document.querySelector("#login-button"));
    this.line.setOptions({startSocket: "bottom", endSocket: "bottom", color: "oklch(0.21 0.006 285.885)"});
  }

  ngOnDestroy() {
    this.line.remove();
  }
}

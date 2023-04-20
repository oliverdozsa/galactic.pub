import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown-time',
  templateUrl: './countdown-time.component.html',
  styleUrls: ['./countdown-time.component.scss']
})
export class CountdownTimeComponent implements OnInit, OnDestroy {
  @Input()
  totalTimeLeftInSeconds: number = 0;

  daysLeft: number = 0;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;

  private timeInterval: any | undefined;

  ngOnInit(): void {
    this.calcRemainingTimes();

    this.timeInterval = setInterval(() => this.tick(), 1000)
  }

  ngOnDestroy(): void {
  }

  private tick() {
    this.totalTimeLeftInSeconds -= 1;
    this.calcRemainingTimes();
  }

  private calcRemainingTimes() {
    this.daysLeft = Math.floor(this.totalTimeLeftInSeconds / 60 / 60 / 24);
    this.hoursLeft = Math.floor((this.totalTimeLeftInSeconds / 60 / 60) % 24);
    this.minutesLeft = Math.floor((this.totalTimeLeftInSeconds / 60) % 60);
    this.secondsLeft = Math.floor((this.totalTimeLeftInSeconds) % 60);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly interests = [
    'Web Development', 'Open Source', 'Distributed Systems', 'Blockchain',
  ];
}

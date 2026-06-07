import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly interests = [
    'Blockchain', 'Distributed Systems', 'Privacy Tech',
    'Web Development', 'Open Source', 'Functional Programming',
  ];
}

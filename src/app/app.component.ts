import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsComponent } from './projects/projects.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, ProjectsComponent, FooterComponent],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-projects />
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    main { min-height: 100vh; }
  `],
})
export class AppComponent {}

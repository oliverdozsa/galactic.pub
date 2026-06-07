import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, ProjectsComponent, AboutComponent, FooterComponent],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-projects />
      <app-about />
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    main { min-height: 100vh; }
  `],
})
export class AppComponent {}

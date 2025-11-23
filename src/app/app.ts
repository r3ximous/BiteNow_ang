import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BiteNow_ang');
}

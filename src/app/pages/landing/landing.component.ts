import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="landing-container">
      <h1>Welcome to BiteNow</h1>
      <p>Select your role to continue:</p>
      <div class="role-selection">
        <button (click)="loginCustomer()">Login as Customer</button>
        <button (click)="loginRestaurant()">Login as Restaurant Owner</button>
      </div>
    </div>
  `,
  styles: [`
    .landing-container { text-align: center; padding: 50px; }
    .role-selection { display: flex; justify-content: center; gap: 20px; margin-top: 20px; }
    button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
  `]
})
export class LandingComponent {
  constructor(private authService: AuthService) {}

  loginCustomer() {
    this.authService.loginAsCustomer();
  }

  loginRestaurant() {
    this.authService.loginAsRestaurant();
  }
}

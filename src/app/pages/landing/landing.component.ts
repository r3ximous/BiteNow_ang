import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
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

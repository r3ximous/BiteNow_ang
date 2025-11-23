import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, Restaurant } from '../models/domain.model';
import { MockDataService } from './mock-data.service';

export type UserRole = 'customer' | 'restaurant' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUserRole = signal<UserRole>(null);
  currentCustomer = signal<Customer | null>(null);
  currentRestaurant = signal<Restaurant | null>(null);

  constructor(private mockData: MockDataService, private router: Router) {}

  loginAsCustomer(customerId: string = 'c1') {
    const customer = this.mockData.customers.find(c => c.id === customerId);
    if (customer) {
      this.currentCustomer.set(customer);
      this.currentUserRole.set('customer');
      this.currentRestaurant.set(null);
      this.router.navigate(['/customer']);
    }
  }

  loginAsRestaurant(restaurantId: string = 'r1') {
    const restaurant = this.mockData.restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      this.currentRestaurant.set(restaurant);
      this.currentUserRole.set('restaurant');
      this.currentCustomer.set(null);
      this.router.navigate(['/restaurant']);
    }
  }

  logout() {
    this.currentUserRole.set(null);
    this.currentCustomer.set(null);
    this.currentRestaurant.set(null);
    this.router.navigate(['/']);
  }
}

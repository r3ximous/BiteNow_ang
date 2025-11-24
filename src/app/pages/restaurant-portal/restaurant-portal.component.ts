import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from '../../services/auth.service';
import { MenuItemOffering } from '../../models/domain.model';

@Component({
  selector: 'app-restaurant-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-portal.component.html',
  styleUrl: './restaurant-portal.component.css'
})
export class RestaurantPortalComponent implements OnInit {
  restaurantName = signal('');
  offerings = signal<MenuItemOffering[]>([]);
  editingItem = signal<MenuItemOffering | null>(null);
  isNewItem = signal(false);

  constructor(private restaurantService: RestaurantService, private authService: AuthService) {}

  ngOnInit() {
    const restaurant = this.authService.currentRestaurant();
    if (restaurant) {
      this.restaurantName.set(restaurant.name);
      this.loadOfferings(restaurant.id);
    }
  }

  loadOfferings(restaurantId: string) {
    this.offerings.set(this.restaurantService.getOfferings(restaurantId));
  }

  addNewItem() {
    this.isNewItem.set(true);
    this.editingItem.set({
      id: Math.random().toString(36).substr(2, 9),
      price: 0,
      isAvailable: true,
      descriptionId: 'new', // Simplified for mock
      restaurantId: this.authService.currentRestaurant()!.id,
      name: '',
      description: ''
    });
  }

  editItem(item: MenuItemOffering) {
    this.isNewItem.set(false);
    this.editingItem.set({ ...item });
  }

  deleteItem(id: string) {
    this.restaurantService.deleteOffering(id);
    this.loadOfferings(this.authService.currentRestaurant()!.id);
  }

  saveItem() {
    if (this.editingItem()) {
      if (this.isNewItem()) {
        this.restaurantService.addOffering(this.editingItem()!);
      } else {
        this.restaurantService.updateOffering(this.editingItem()!);
      }
      this.editingItem.set(null);
      this.loadOfferings(this.authService.currentRestaurant()!.id);
    }
  }

  cancelEdit() {
    this.editingItem.set(null);
  }

  logout() {
    this.authService.logout();
  }
}

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
  template: `
    <div class="portal-container">
      <header>
        <h2>Restaurant Dashboard: {{ restaurantName() }}</h2>
        <button (click)="logout()">Logout</button>
      </header>

      <div class="content">
        <div class="offerings-list">
          <h3>Current Menu Offerings</h3>
          <ul>
            <li *ngFor="let item of offerings()">
              <span>{{ item.name }} - \${{ item.price }}</span>
              <button (click)="editItem(item)">Edit</button>
              <button (click)="deleteItem(item.id)">Delete</button>
            </li>
          </ul>
          <button (click)="addNewItem()">Add New Item</button>
        </div>

        <div class="editor" *ngIf="editingItem()">
          <h3>{{ isNewItem() ? 'Add New Item' : 'Edit Item' }}</h3>
          <form (ngSubmit)="saveItem()">
            <label>Name: <input [(ngModel)]="editingItem()!.name" name="name" required></label>
            <label>Description: <input [(ngModel)]="editingItem()!.description" name="description"></label>
            <label>Price: <input type="number" [(ngModel)]="editingItem()!.price" name="price" required></label>
            <label>Available: <input type="checkbox" [(ngModel)]="editingItem()!.isAvailable" name="isAvailable"></label>
            <button type="submit">Save</button>
            <button type="button" (click)="cancelEdit()">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .portal-container { padding: 20px; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; margin-bottom: 20px; }
    .content { display: flex; gap: 40px; }
    .offerings-list { flex: 1; }
    .editor { flex: 1; border: 1px solid #eee; padding: 20px; }
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    form { display: flex; flex-direction: column; gap: 10px; }
  `]
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

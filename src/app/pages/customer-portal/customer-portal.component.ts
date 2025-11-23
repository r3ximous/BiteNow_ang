import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Restaurant, MenuItemOffering } from '../../models/domain.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="customer-container">
      <header>
        <h2>Welcome, {{ customerName() }}</h2>
        <div class="actions">
          <a routerLink="/cart">Cart ({{ cartCount() }}) - \${{ cartTotal() | number:'1.2-2' }}</a>
          <button (click)="logout()">Logout</button>
        </div>
      </header>

      <div *ngIf="!selectedRestaurant()">
        <h3>Available Restaurants</h3>
        <div class="restaurant-grid">
          <div *ngFor="let r of restaurants()" class="restaurant-card" (click)="selectRestaurant(r)">
            <h4>{{ r.name }}</h4>
          </div>
        </div>
      </div>

      <div *ngIf="selectedRestaurant()">
        <button (click)="clearSelection()">Back to Restaurants</button>
        <h3>Menu: {{ selectedRestaurant()!.name }}</h3>
        
        <div class="search-bar">
          <input type="text" placeholder="Search menu items..." [(ngModel)]="searchQuery" (input)="filterMenu()">
        </div>

        <div class="menu-grid">
          <div *ngFor="let item of filteredMenu()" class="menu-item-card">
            <h4>{{ item.name }}</h4>
            <p>{{ item.description }}</p>
            <div class="price-row">
              <span>\${{ item.price }}</span>
              <button (click)="addToCart(item)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .customer-container { padding: 20px; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; margin-bottom: 20px; }
    .actions { display: flex; gap: 20px; align-items: center; }
    .restaurant-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
    .restaurant-card { border: 1px solid #ddd; padding: 20px; cursor: pointer; border-radius: 8px; transition: background 0.2s; }
    .restaurant-card:hover { background: #f9f9f9; }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
    .menu-item-card { border: 1px solid #eee; padding: 15px; border-radius: 8px; }
    .price-row { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
    .search-bar { margin: 20px 0; }
    input { padding: 8px; width: 100%; max-width: 300px; }
  `]
})
export class CustomerPortalComponent implements OnInit {
  customerName = signal('');
  restaurants = signal<Restaurant[]>([]);
  selectedRestaurant = signal<Restaurant | null>(null);
  menuItems = signal<MenuItemOffering[]>([]);
  filteredMenu = signal<MenuItemOffering[]>([]);
  
  searchQuery = '';

  cartCount;
  cartTotal;

  constructor(
    private catalogService: CatalogService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.cartCount = this.cartService.totalItems;
    this.cartTotal = this.cartService.totalPrice;
  }

  ngOnInit() {
    const customer = this.authService.currentCustomer();
    if (customer) {
      this.customerName.set(customer.name);
    }
    this.restaurants.set(this.catalogService.getAllRestaurants());
  }

  selectRestaurant(r: Restaurant) {
    this.selectedRestaurant.set(r);
    const menu = this.catalogService.getMenuForRestaurant(r.id);
    this.menuItems.set(menu);
    this.filteredMenu.set(menu);
  }

  clearSelection() {
    this.selectedRestaurant.set(null);
    this.searchQuery = '';
  }

  filterMenu() {
    const query = this.searchQuery.toLowerCase();
    this.filteredMenu.set(
      this.menuItems().filter(item => 
        item.name?.toLowerCase().includes(query) || 
        item.description?.toLowerCase().includes(query)
      )
    );
  }

  addToCart(item: MenuItemOffering) {
    this.cartService.addToCart(item);
  }

  logout() {
    this.authService.logout();
  }
}

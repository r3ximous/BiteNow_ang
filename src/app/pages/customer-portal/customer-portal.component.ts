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
  templateUrl: './customer-portal.component.html',
  styleUrl: './customer-portal.component.css'
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

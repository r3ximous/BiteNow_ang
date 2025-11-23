import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cart-container">
      <h2>Your Cart</h2>
      
      <div *ngIf="cartItems().length === 0" class="empty-cart">
        <p>Your cart is empty.</p>
        <a routerLink="/customer">Browse Restaurants</a>
      </div>

      <div *ngIf="cartItems().length > 0">
        <div class="cart-items">
          <div *ngFor="let line of cartItems()" class="cart-line">
            <div class="item-info">
              <h4>{{ line.offering?.name }}</h4>
              <span>\${{ line.offering?.price }} each</span>
            </div>
            <div class="controls">
              <button (click)="updateQty(line.id, line.quantity - 1)">-</button>
              <span>{{ line.quantity }}</span>
              <button (click)="updateQty(line.id, line.quantity + 1)">+</button>
              <button (click)="remove(line.id)" class="remove-btn">Remove</button>
            </div>
            <div class="line-total">
              \${{ (line.quantity * (line.offering?.price || 0)) | number:'1.2-2' }}
            </div>
          </div>
        </div>

        <div class="summary">
          <h3>Total: \${{ total() | number:'1.2-2' }}</h3>
          <div class="actions">
            <button (click)="clear()">Clear Cart</button>
            <button (click)="checkout()" class="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
        <a routerLink="/customer">Continue Shopping</a>
      </div>
    </div>
  `,
  styles: [`
    .cart-container { padding: 20px; max-width: 800px; margin: 0 auto; }
    .cart-line { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee; }
    .controls { display: flex; gap: 10px; align-items: center; }
    .summary { margin-top: 30px; text-align: right; border-top: 2px solid #eee; padding-top: 20px; }
    .actions { display: flex; justify-content: flex-end; gap: 20px; margin-top: 20px; }
    button { padding: 5px 10px; cursor: pointer; }
    .checkout-btn { background: #28a745; color: white; border: none; padding: 10px 20px; font-size: 16px; border-radius: 4px; }
    .remove-btn { background: #dc3545; color: white; border: none; }
  `]
})
export class CartComponent {
  cartItems;
  total;

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems = this.cartService.cartItems;
    this.total = this.cartService.totalPrice;
  }

  updateQty(id: string, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }

  remove(id: string) {
    this.cartService.removeFromCart(id);
  }

  clear() {
    this.cartService.clearCart();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Address } from '../../models/domain.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-container">
      <h2>Checkout</h2>
      
      <div *ngIf="!orderPlaced()">
        <div class="summary-preview">
          <h3>Order Total: \${{ total() | number:'1.2-2' }}</h3>
        </div>

        <form (ngSubmit)="placeOrder()">
          <div class="section">
            <h3>Delivery Address</h3>
            <label>Street: <input [(ngModel)]="address.street" name="street" required></label>
            <label>City: <input [(ngModel)]="address.city" name="city" required></label>
            <label>Zip: <input [(ngModel)]="address.zip" name="zip" required></label>
          </div>

          <div class="section">
            <h3>Payment Method</h3>
            <select [(ngModel)]="paymentMethod" name="payment">
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          <button type="submit" [disabled]="total() === 0">Place Order</button>
        </form>
      </div>

      <div *ngIf="orderPlaced()" class="success-message">
        <h3>Order Placed Successfully!</h3>
        <p>Thank you for your order.</p>
        <button (click)="goHome()">Return Home</button>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container { padding: 20px; max-width: 600px; margin: 0 auto; }
    .section { margin-bottom: 30px; border: 1px solid #eee; padding: 20px; border-radius: 8px; }
    form { display: flex; flex-direction: column; gap: 15px; }
    label { display: block; margin-bottom: 10px; }
    input, select { width: 100%; padding: 8px; margin-top: 5px; }
    button { padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
    button:disabled { background: #ccc; }
    .success-message { text-align: center; padding: 50px; background: #d4edda; border-radius: 8px; }
  `]
})
export class CheckoutComponent {
  total;
  address: Address = { street: '', city: '', zip: '' };
  paymentMethod = 'credit_card';
  orderPlaced = signal(false);

  constructor(private cartService: CartService, private router: Router) {
    this.total = this.cartService.totalPrice;
  }

  placeOrder() {
    // In a real app, we would send this to the backend
    console.log('Order placed', {
      items: this.cartService.cartItems(),
      total: this.total(),
      address: this.address,
      payment: this.paymentMethod
    });
    
    this.cartService.clearCart();
    this.orderPlaced.set(true);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}

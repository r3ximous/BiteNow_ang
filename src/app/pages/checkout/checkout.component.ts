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
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
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

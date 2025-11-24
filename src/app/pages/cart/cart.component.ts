import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
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

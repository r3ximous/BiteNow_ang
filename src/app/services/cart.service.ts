import { Injectable, signal, computed, effect } from '@angular/core';
import { Basket, BasketLine, MenuItemOffering } from '../models/domain.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  // In a real app, this would be loaded from an API based on the user
  private basket = signal<Basket>({
    id: 'b1',
    status: 'active',
    customerId: 'c1',
    lines: []
  });

  cartItems = computed(() => this.basket().lines);
  
  totalItems = computed(() => 
    this.basket().lines.reduce((acc, line) => acc + line.quantity, 0)
  );

  totalPrice = computed(() => 
    this.basket().lines.reduce((acc, line) => {
      return acc + (line.quantity * (line.offering?.price || 0));
    }, 0)
  );

  constructor() {
    // Effect to persist cart to local storage (mock persistence)
    effect(() => {
      localStorage.setItem('bitenow_cart', JSON.stringify(this.basket()));
    });

    const savedCart = localStorage.getItem('bitenow_cart');
    if (savedCart) {
      this.basket.set(JSON.parse(savedCart));
    }
  }

  addToCart(offering: MenuItemOffering) {
    this.basket.update(currentBasket => {
      const existingLine = currentBasket.lines.find(l => l.offeringId === offering.id);
      
      let newLines;
      if (existingLine) {
        newLines = currentBasket.lines.map(l => 
          l.offeringId === offering.id 
            ? { ...l, quantity: l.quantity + 1 } 
            : l
        );
      } else {
        const newLine: BasketLine = {
          id: Math.random().toString(36).substr(2, 9),
          quantity: 1,
          offeringId: offering.id,
          offering: offering
        };
        newLines = [...currentBasket.lines, newLine];
      }

      return { ...currentBasket, lines: newLines };
    });
  }

  removeFromCart(lineId: string) {
    this.basket.update(b => ({
      ...b,
      lines: b.lines.filter(l => l.id !== lineId)
    }));
  }

  updateQuantity(lineId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(lineId);
      return;
    }

    this.basket.update(b => ({
      ...b,
      lines: b.lines.map(l => l.id === lineId ? { ...l, quantity } : l)
    }));
  }

  clearCart() {
    this.basket.update(b => ({ ...b, lines: [] }));
  }
}

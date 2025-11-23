import { Injectable } from '@angular/core';
import { Customer, Restaurant, Menu, Category, MenuItemDescription, MenuItemOffering, Order } from '../models/domain.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  customers: Customer[] = [
    { id: 'c1', name: 'John Doe', hasActiveBasket: true }
  ];

  restaurants: Restaurant[] = [
    { id: 'r1', name: 'Pizza Palace', offers: [] },
    { id: 'r2', name: 'Burger Barn', offers: [] }
  ];

  menus: Menu[] = [
    { id: 'm1', title: 'Pizza Menu', items: [] },
    { id: 'm2', title: 'Burger Menu', items: [] }
  ];

  categories: Category[] = [
    { id: 'cat1', name: 'Main Courses', items: [] },
    { id: 'cat2', name: 'Drinks', items: [] }
  ];

  descriptions: MenuItemDescription[] = [
    { id: 'd1', name: 'Margherita Pizza', description: 'Classic cheese and tomato', categoryId: 'cat1', menuId: 'm1' },
    { id: 'd2', name: 'Pepperoni Pizza', description: 'Spicy pepperoni', categoryId: 'cat1', menuId: 'm1' },
    { id: 'd3', name: 'Cheeseburger', description: 'Beef patty with cheese', categoryId: 'cat1', menuId: 'm2' },
    { id: 'd4', name: 'Coke', description: 'Chilled cola', categoryId: 'cat2', menuId: 'm1' }
  ];

  offerings: MenuItemOffering[] = [
    { id: 'o1', price: 12.99, isAvailable: true, descriptionId: 'd1', restaurantId: 'r1' },
    { id: 'o2', price: 14.99, isAvailable: true, descriptionId: 'd2', restaurantId: 'r1' },
    { id: 'o3', price: 9.99, isAvailable: true, descriptionId: 'd3', restaurantId: 'r2' },
    { id: 'o4', price: 2.99, isAvailable: true, descriptionId: 'd4', restaurantId: 'r1' }
  ];

  orders: Order[] = [];

  constructor() {
    // Link offerings to descriptions for easier mocking
    this.offerings.forEach(o => {
      const desc = this.descriptions.find(d => d.id === o.descriptionId);
      if (desc) {
        o.name = desc.name;
        o.description = desc.description;
      }
    });
  }

  getOfferingsByRestaurant(restaurantId: string): MenuItemOffering[] {
    return this.offerings.filter(o => o.restaurantId === restaurantId);
  }

  getAllRestaurants(): Restaurant[] {
    return this.restaurants;
  }
}

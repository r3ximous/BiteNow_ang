import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { Restaurant, MenuItemOffering } from '../models/domain.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private mockData: MockDataService) { }

  getAllRestaurants(): Restaurant[] {
    return this.mockData.getAllRestaurants();
  }

  getRestaurantDetails(id: string): Restaurant | undefined {
    return this.mockData.restaurants.find(r => r.id === id);
  }

  getMenuForRestaurant(restaurantId: string): MenuItemOffering[] {
    return this.mockData.getOfferingsByRestaurant(restaurantId);
  }
}

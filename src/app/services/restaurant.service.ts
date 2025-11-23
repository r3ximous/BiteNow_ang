import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { MenuItemOffering } from '../models/domain.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private mockData: MockDataService) { }

  getOfferings(restaurantId: string): MenuItemOffering[] {
    return this.mockData.getOfferingsByRestaurant(restaurantId);
  }

  addOffering(offering: MenuItemOffering) {
    this.mockData.offerings.push(offering);
  }

  updateOffering(offering: MenuItemOffering) {
    const index = this.mockData.offerings.findIndex(o => o.id === offering.id);
    if (index !== -1) {
      this.mockData.offerings[index] = offering;
    }
  }

  deleteOffering(id: string) {
    const index = this.mockData.offerings.findIndex(o => o.id === id);
    if (index !== -1) {
      this.mockData.offerings.splice(index, 1);
    }
  }
}

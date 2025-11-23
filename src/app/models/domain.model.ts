export interface Customer {
  id: string;
  name: string;
  hasActiveBasket?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  offers: MenuItemOffering[];
}

export interface Courier {
  id: string;
  name: string;
}

export interface Menu {
  id: string;
  title: string;
  items: MenuItemDescription[];
}

export interface Category {
  id: string;
  name: string;
  items: MenuItemDescription[];
}

export interface MenuItemDescription {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  menuId: string;
}

export interface MenuItemOffering {
  id: string;
  price: number;
  isAvailable: boolean;
  descriptionId: string;
  restaurantId: string;
  // Enriched property for UI convenience, usually joined from Description
  name?: string; 
  description?: string;
}

export interface Basket {
  id: string;
  status: 'active' | 'checked_out';
  customerId: string;
  lines: BasketLine[];
}

export interface BasketLine {
  id: string;
  quantity: number;
  offeringId: string;
  offering?: MenuItemOffering; // For UI display
}

export interface Order {
  id: string;
  status: 'pending' | 'confirmed' | 'delivered';
  customerId: string;
  paymentMethod: string;
  deliveryStatus: string;
  lines: OrderLine[];
}

export interface OrderLine {
  id: string;
  quantity: number;
  unitPriceAtOrder: number;
  offeringId: string;
}

export interface Delivery {
  id: string;
  status: string;
  courierId?: string;
  timeSlot?: string;
}

export interface Address {
  street: string;
  city: string;
  zip: string;
}

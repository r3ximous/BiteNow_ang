import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { RestaurantPortalComponent } from './pages/restaurant-portal/restaurant-portal.component';
import { CustomerPortalComponent } from './pages/customer-portal/customer-portal.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'restaurant', component: RestaurantPortalComponent },
  { path: 'customer', component: CustomerPortalComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
];

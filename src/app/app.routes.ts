import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { BookComponent } from './book/book.component';
import { SpecialComponent } from './special/special.component';
import { SpecialBookAdminComponent } from './special-book-admin/special-book-admin.component';
import { SpecialBookingComponent } from './special-booking/special-booking.component';
import { OrderComponent } from './order/order.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
   {
    path: 'admin',
    component: AdminComponent
   },
   {
    path: '',
    redirectTo : 'login',
    pathMatch: 'full'
   },
   {
    path: 'home',
    component: HomeComponent
   }
   ,
   {
    path: 'login',
    component: LoginComponent
   }
   ,
   {
    path: 'book-table',
    component: BookingComponent
   }
   ,
   {
    path: 'book',
    component: BookComponent
   }
   ,
   {
    path: 'special',
    component: SpecialComponent
   }
   ,
   {
    path: 'special-book-admin',
    component: SpecialBookAdminComponent
   },
   {
    path: 'special-booking',
    component: SpecialBookingComponent
   }
   ,
   {
    path: 'order',
    component: OrderComponent
   },
   {
    path: 'menu',
    component: MenuComponent
   }
];

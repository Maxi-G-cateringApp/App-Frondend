import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/state/auth.state';
import { logout } from '../../../auth/state/auth.action';
import { isAuthenticated } from '../../../auth/state/auth.selector';
import { MatDialog } from '@angular/material/dialog';
import { OrderNotificationComponent } from '../order-notification/order-notification.component';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};
@Component({
  selector: 'app-admin-menubar',
  templateUrl: './admin-menubar.component.html',
  styleUrl: './admin-menubar.component.css',
})
export class AdminMenubarComponent implements OnInit {
[x: string]: any;
  isAuthenticated: Observable<boolean> | undefined;
  constructor(private store: Store<AuthState>,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  menuItem = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'DashBoard', route: '/admin/home' },
    { icon: 'people', label: 'Users', route: '/admin/all-users' },
    {
      icon: 'restaurant_menu',
      label: 'Food Combos',
      route: '/admin/all_combos',
    },
    {
      icon: 'restaurant_menu',
      label: 'Food Items',
      route: '/admin/food-items',
    },
    { icon: 'category', label: 'Food Categories', route: '/admin/categories' },
    { icon: 'event_note', label: 'Event', route: '/admin/events' },
    { icon: 'fastfood', label: 'Orders', route: '/admin/orders' },
    {
      icon: 'supervisor_account',
      label: 'Employees',
      route: '/admin/employees',
    },
    { icon: 'new_releases', label: 'Offers', route: '/admin/offer' },
    {
      icon: 'supervised_user_circle',
      label: 'DecorationTeam',
      route: '/admin/decor-team',
    },
    {
      icon: 'supervised_user_circle',
      label: 'KitchenCrewTeam',
      route: '/admin/kitchenCrew-team',
    },
    {
      icon: 'supervised_user_circle',
      label: 'ServeTeam',
      route: '/admin/serve-team',
    },
    { icon: 'chat_bubble', label: 'Chats', route: '/admin/chat' },
  ]);

  sideNavCollapsed = signal(false);

  //  collapse(val: boolean) {
  //   this.sideNavCollapsed.set(val);
  // }
  
  collapsed = signal(true);
  sideNavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }

  openNotification(){
    this.dialog.open(OrderNotificationComponent,{
      width:'30%',
      height:'70%',
      position: {
        top: '8%',
        right:'1%'
      }
    })
  }
}

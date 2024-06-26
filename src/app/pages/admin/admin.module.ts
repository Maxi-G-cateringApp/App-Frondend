import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AddFoodComboComponent } from './components/add-food-combo/add-food-combo.component';
import { ComboItemsComponent } from './components/combo-items/combo-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AddItemComponent } from './components/add-item/add-item.component';
import { FoodItemsComponent } from './components/food-items/food-items.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AdminMenubarComponent } from './components/admin-menubar/admin-menubar.component';
import { AdminComponent } from '../../layouts/admin/components.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoriesComponent } from './components/add-categories/add-categories.component';
import { EventsComponent } from './components/events/events.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ServingTeamsComponent } from './components/team/serving-teams/serving-teams.component';
import { DecorationTeamsComponent } from './components/team/decoration-teams/decoration-teams.component';
import { AddServingTeamComponent } from './components/team/serving-teams/add-serving-team/add-serving-team.component';
import { AddServingEmployeesComponent } from './components/team/serving-teams/add-serving-employees/add-serving-employees.component';
import { AddDecorationEmployeesComponent } from './components/team/decoration-teams/add-decoration-employees/add-decoration-employees.component';
import { AddDecorationTeamComponent } from './components/team/decoration-teams/add-decoration-team/add-decoration-team.component';
import { KitchenCrewTeamsComponent } from './components/team/kitchen-crew-teams/kitchen-crew-teams.component';
import { AddKitchenCrewTeamComponent } from './components/team/kitchen-crew-teams/add-kitchen-crew-team/add-kitchen-crew-team.component';
import { AddKitchenCrewEmployeesComponent } from './components/team/kitchen-crew-teams/add-kitchen-crew-employees/add-kitchen-crew-employees.component';
import { OrderProcessingComponent } from './components/order-processing/order-processing.component';
import { AddComboPicComponent } from './components/add-food-combo/add-combo-pic/add-combo-pic.component';
import { LocationDisplayComponent } from './components/order-details/location-display/location-display.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceAutoCompleteComponent } from './components/order-details/place-auto-complete/place-auto-complete.component';
import { MapDisplayComponent } from './components/order-details/map-display/map-display.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { OffersComponent } from './components/offers/offers.component';
import { AddOfferComponent } from './components/offers/add-offer/add-offer.component';
import { ShowSalesReportComponent } from './components/show-sales-report/show-sales-report.component';
import { OrderNotificationComponent } from './components/order-notification/order-notification.component';
import { PrimeNgModules } from '../../shared/prime-ng/prime-ng.module';
import { MembersComponent } from './components/team/serving-teams/members/members.component';
import { KitchenCrewMembersComponent } from './components/team/kitchen-crew-teams/kitchen-crew-members/kitchen-crew-members.component';
import { DecorationMembersComponent } from './components/team/decoration-teams/decoration-members/decoration-members.component';
import { AddItemPicComponent } from './components/add-item/add-item-pic/add-item-pic.component';
import { UserListComponent } from './components/users-list/user-list/user-list.component';
import { PartnerListComponent } from './components/users-list/partner-list/partner-list.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AddFoodComboComponent,
    ComboItemsComponent,
    AddItemComponent,
    FoodItemsComponent,
    AdminMenubarComponent,
    AdminComponent,
    CategoriesComponent,
    AddCategoriesComponent,
    EventsComponent,
    AddEventComponent,
    OrderComponent,
    OrderDetailsComponent,
    ServingTeamsComponent,
    DecorationTeamsComponent,
    AddServingTeamComponent,
    AddServingEmployeesComponent,
    AddDecorationEmployeesComponent,
    AddDecorationTeamComponent,
    KitchenCrewTeamsComponent,
    AddKitchenCrewTeamComponent,
    AddKitchenCrewEmployeesComponent,
    OrderProcessingComponent,
    AddComboPicComponent,
    LocationDisplayComponent,
    PlaceAutoCompleteComponent,
    MapDisplayComponent,
    UsersListComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    ChatListComponent,
    ViewUserComponent,
    OffersComponent,
    AddOfferComponent,
    ShowSalesReportComponent,
    OrderNotificationComponent,
    MembersComponent,
    KitchenCrewMembersComponent,
    DecorationMembersComponent,
    AddItemPicComponent,
    UserListComponent,
    PartnerListComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule,MaterialModule,GoogleMapsModule,FormsModule,PickerModule,PrimeNgModules],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AddFoodComboComponent } from './components/admin/add-food-combo/add-food-combo.component';
import { ComboItemsComponent } from './components/admin/combo-items/combo-items.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'admin_home', component: AdminHomeComponent},
  {path: 'add_combo', component:AddFoodComboComponent},
  {path: 'all_combos', component: ComboItemsComponent},
 
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then((m) => m.AuthModule)
  },
  // {
  //   path: 'admin',
  //     loadChildren: ()=> import('./admin/admin.module').then((m) => m.AdminModule)
   
  // }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

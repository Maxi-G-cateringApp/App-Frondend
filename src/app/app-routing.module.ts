import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { loginGuard } from './guards/login.guard';
import { AdminMenubarComponent } from './pages/admin/components/admin-menubar/admin-menubar.component';
import { AdminComponent } from './layouts/admin/components.component';
import { UserMenubarComponent } from './pages/user/components/user-menubar/user-menubar.component';
import { UserComponent } from './layouts/user/user.component';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { AuthComponent } from './layouts/auth/auth.component';



const routes: Routes = [
  {path: '',component:HomePageComponent},


  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: ()=> import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'admin',
    component: AdminComponent,
      loadChildren: ()=> import('./pages/admin/admin.module').then((m) => m.AdminModule)
  },
  { 
    path: 'user', 
    component: UserComponent,
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) 
  },
  
  {path: '**', component: NotFoundComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

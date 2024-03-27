import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { loginGuard } from './guards/login.guard';
import { AdminMenubarComponent } from './pages/admin/components/admin-menubar/admin-menubar.component';
import { AdminComponent } from './pages/admin/components.component';



const routes: Routes = [
  {path: '',component:HomePageComponent},


  {
    path: 'auth',
    loadChildren: ()=> import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'admin',
    component: AdminComponent,
      loadChildren: ()=> import('./pages/admin/admin.module').then((m) => m.AdminModule)
  },
  { 
    path: 'user', 
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) 
  },
  
  {path: '**', component: NotFoundComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

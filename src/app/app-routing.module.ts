import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then((m) => m.AuthModule)
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

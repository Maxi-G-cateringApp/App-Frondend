import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { loginGuard } from "../../guards/login.guard";
import { RegisterComponent } from "./components/register/register.component";


const routes: Routes = [
    {
      path: '',
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: '', component: LoginComponent, canActivate: [loginGuard] },
        {
          path: 'register',
          component: RegisterComponent,
          canActivate: [loginGuard],
        },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
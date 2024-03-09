import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { OtpComponent } from './otp/otp.component';
import { UserHomeComponent } from "../components/home/user-home/user-home.component";
import { AdminHomeComponent } from "../components/admin/admin-home/admin-home.component";
import { loginGuard } from "./guards/login.guard";
import { adminGuard } from "./guards/admin.guard";


const routes: Routes = [
    {path:'',children:[
        {path:'',redirectTo: 'login',pathMatch: "full"},
        {path: 'login',component: LoginComponent,canActivate:[loginGuard]},
        {path: 'register', component: RegisterComponent,canActivate:[loginGuard]},
        {path:'user_home', component: UserHomeComponent,canActivate:[adminGuard]},
        {path: 'verify-account/:email', component: OtpComponent,canActivate:[loginGuard]},
    ]}
]
@NgModule({

    declarations: 
    [LoginComponent,
    RegisterComponent,
    OtpComponent,
    UserHomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([]),
        ReactiveFormsModule]

})
export class AuthModule {

}
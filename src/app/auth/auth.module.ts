import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { AUTH_STATE_NAME } from "./state/auth.selector";
import { AuthReducer } from "./state/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./state/auth.effects";
import { OtpComponent } from './otp/otp.component';
import { UserHomeComponent } from "../components/home/user-home/user-home.component";
import { AdminHomeComponent } from "../components/admin/admin-home/admin-home.component";

const routes: Routes = [
    {path:'',children:[
        {path:'',redirectTo: 'login',pathMatch: "full"},
        {path: 'login',component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path:'user_home', component: UserHomeComponent},
        {path: 'verify-account/:email', component: OtpComponent},
        {path: 'admin_home', component: AdminHomeComponent}
    ]}
]

@NgModule({

    declarations: [LoginComponent,
    RegisterComponent,
    OtpComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([]),
        ReactiveFormsModule]

})
export class AuthModule {

}
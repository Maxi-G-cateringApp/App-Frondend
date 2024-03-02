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

const routes: Routes = [
    {path:'',children:[
        {path:'',redirectTo: 'login',pathMatch: "full"},
        {path: 'login',component: LoginComponent},
        {path: 'register', component: RegisterComponent}
    ]}
]

@NgModule({

    declarations: [LoginComponent,
    RegisterComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
        EffectsModule.forFeature([AuthEffects]),
        ReactiveFormsModule]

})
export class AuthModule {

}
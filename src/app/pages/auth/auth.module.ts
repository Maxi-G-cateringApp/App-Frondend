import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RegisterComponent } from './components/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from '../../layouts/auth/auth.component';
import { MaterialModule } from '../../shared/material/material.module';
import { LoginMenuComponent } from './components/login-menu/login-menu.component';


@NgModule({
  declarations: [LoginComponent,RegisterComponent,AuthComponent, LoginMenuComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([]),
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule
  ],
})
export class AuthModule {
  
}

import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BottomSessionComponent } from './components/home/bottom-session/bottom-session.component';
import { SessionComponent } from './components/home/bottom-session/session/session.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FooterComponent } from './components/footer/footer.component';
import { appReducer } from './shared/app.state';
import { AuthEffects } from './auth/state/auth.effects';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AddFoodComboComponent } from './components/admin/add-food-combo/add-food-combo.component';
import { HttpInterceptorService } from './intercepter/http-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ComboItemsComponent } from './components/admin/combo-items/combo-items.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    BottomSessionComponent,
    SessionComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    AdminHomeComponent,
    AddFoodComboComponent,
    ComboItemsComponent,
    AdminNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpInterceptorService,
    //   multi: true,
    // },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

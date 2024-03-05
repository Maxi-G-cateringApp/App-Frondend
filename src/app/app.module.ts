import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BottomSessionComponent } from './components/home/bottom-session/bottom-session.component';
import { SessionComponent } from './components/home/bottom-session/session/session.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { UserHomeComponent } from './components/home/user-home/user-home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FooterComponent } from './components/footer/footer.component';
import { appReducer } from './shared/app.state';
import { AuthEffects } from './auth/state/auth.effects';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    BottomSessionComponent,
    SessionComponent,
    LoadingSpinnerComponent,
    UserHomeComponent,
    FooterComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    HttpClientModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

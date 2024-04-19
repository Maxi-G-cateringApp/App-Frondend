import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { BottomSessionComponent } from './shared/components/bottom-session/bottom-session.component';
import { SessionComponent } from './shared/components/bottom-session/session/session.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FooterComponent } from './shared/components/footer/footer.component';
import { appReducer } from './shared/app.state';
import { AuthEffects } from './pages/auth/state/auth.effects';
import { HttpInterceptorService } from './core/interceptors/http-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MaterialModule } from './shared/material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    BottomSessionComponent,
    SessionComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    GoogleMapsModule,
    [SweetAlert2Module.forRoot()]
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

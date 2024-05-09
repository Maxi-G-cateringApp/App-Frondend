import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../../../pages/auth/state/auth.selector';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  token: string | null = '';
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  imagePath2: String ="/assets/Home.jpg"
    // '/assets/vegetarian-kerala-meals-on-banana-leaf-2BMT9DB.png';
  // logo: string = "/assets/Brown_Simple_Minimalist_Cuisine_Logo-removebg-preview (1).png"
  imagePath: String =
    '/assets/vegetarian-kerala-meals-on-banana-leaf-2BMT9DB.png';

  onLogin() {
    if (this.token) {
      this.router.navigateByUrl('/user/home');
    } else {
      this.router.navigateByUrl('/auth');
    }
  }
}

// src/assets/vegetarian-kerala-meals-on-banana-leaf-2BMT9DB.png

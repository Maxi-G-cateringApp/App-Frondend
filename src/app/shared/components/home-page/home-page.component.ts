import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private router: Router){}

  imagePath2:String = "/assets/vegetarian-kerala-meals-on-banana-leaf-2BMT9DB.png";
  // logo: string = "/assets/Brown_Simple_Minimalist_Cuisine_Logo-removebg-preview (1).png"
  imagePath:String = "/assets/vegetarian-kerala-meals-on-banana-leaf-2BMT9DB.png";


  onLogin(){

    this.router.navigateByUrl('/auth')
    console.log('clicked');
    

  }

}

// src/assets/vegetarian-kerala-meals-on-banana-leaf-2BMT9DB.png
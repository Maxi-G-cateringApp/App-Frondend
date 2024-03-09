import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  imagePath2:String = "/assets/buffet-315691_1280.jpg";
  // logo: string = "/assets/Brown_Simple_Minimalist_Cuisine_Logo-removebg-preview (1).png"
  imagePath:String = "/assets/vegetarian-kerala-meals-on-banana-leaf-2BMT9DB.png";

}

//src/assets/pexels-baljit-johal-6387703.jpg home-image vegetarian-kerala-meals-on-banana-leaf-2BMT9DB
//src/assets/buffet-315691_1280.jpg  src/assets/tablecloth-3336687_1920.jpg  src/assets/affair-1238429_1920.jpg
//src/assets/vegetarian-kerala-meals-on-banana-leaf-2BMT9DB.png src/assets/Brown_Simple_Minimalist_Cuisine_Logo-removebg-preview (1).png
import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-frondend';

  // constructor(private spinnerService: LoadingSpinnerComponent){}
}

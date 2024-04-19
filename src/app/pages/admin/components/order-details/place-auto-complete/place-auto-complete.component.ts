import { Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { PlaceSearchResult } from '../../../models/placeSearchResult.model';

@Component({
  selector: 'app-place-auto-complete',
  templateUrl: './place-auto-complete.component.html',
  styleUrl: './place-auto-complete.component.css'
})
export class PlaceAutoCompleteComponent {

  @ViewChild('inputField')
  inputField!: ElementRef;
  @Input() placeholder = ''
  @Output() placeChanges = new EventEmitter<PlaceSearchResult>();
  autoComplete: google.maps.places.Autocomplete | undefined;

  constructor(private ngZone: NgZone){}


  ngAfterViewInit(): void {
    this.autoComplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );
   
    
    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete?.getPlace();
      const result: PlaceSearchResult = {
        address: this.inputField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        iconUrl: place?.icon
      };
      this.ngZone.run(()=>{
        this.placeChanges.emit(result)
        console.log(result);
        
      })
     
    });
  }


}

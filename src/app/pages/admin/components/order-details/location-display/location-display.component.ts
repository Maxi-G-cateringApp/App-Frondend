import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SearchPlaceResult } from '../../../../user/models/search-place.model';
import { MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs';
import { PlaceSearchResult } from '../../../models/placeSearchResult.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrl: './location-display.component.css'
})
export class LocationDisplayComponent{

  fromValue!: PlaceSearchResult;
  toValue!:  PlaceSearchResult;

  constructor(private ref: MatDialogRef<LocationDisplayComponent>,){}

  closePopup(){
    this.ref.close()

  }



}

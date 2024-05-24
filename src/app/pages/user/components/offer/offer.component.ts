import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { Offer } from '../../../admin/models/offer.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent implements OnInit{

  offers!: Offer[];

  constructor(private masterService: MasterService){}

  ngOnInit(): void {
      this.getAllOffers();
  }



  getAllOffers(){
    this.masterService.getAllEnabledOffers().subscribe((data)=>{
      this.offers = data;
    })
  }
 

}

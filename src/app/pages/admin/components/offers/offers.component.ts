import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../../../core/services/master.service';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { Offer } from '../../models/offer.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent implements OnInit {
  offers!: Offer[];
  displayedColumns: string[] = ['offerName', 'discount', 'action'];
  dataSource: any;

  constructor(
    private dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.getAllOffers();
  }

  addOffer() {
    this.openPopup();
  }

  openPopup() {
    var _popup = this.dialog.open(AddOfferComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.getAllOffers();
    });
  }

  getAllOffers() {
    this.masterService.getAllOffers().subscribe((data) => {
      this.offers = data;
      this.dataSource = new MatTableDataSource<Offer>(this.offers);
    });
  }
  enableOffer(id: number) {
    this.masterService.enableOffer(id).subscribe((data) => {
      this.getAllOffers();
    });
  }
  disableOffer(id: number) {
    this.masterService.disableeOffer(id).subscribe((data) => {
      this.getAllOffers();
    });
  }
}

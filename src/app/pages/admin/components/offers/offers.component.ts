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
  displayedColumns: string[] = ['offerName', 'discount', 'comboName', 'action'];
  dataSource: any;

  constructor(
    private dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.getAllOffers();
  }

  addOffer() {
    this.openPopup(0, 'Add Offer');
  }

  openPopup(id: number, title: string, isEdit: boolean = false) {
    var _popup = this.dialog.open(AddOfferComponent, {
      width: '40%',
      data: {
        id: id,
        title: title,
        isEdit: isEdit,
      },
    });
    _popup.afterClosed().subscribe((data) => {
      this.getAllOffers();
    });
  }
  editOffer(id: number) {
    this.openPopup(id, 'Edit Offer', true);
  }

  getAllOffers() {
    this.masterService.getAllOffers().subscribe((data) => {
      this.offers = data;

      this.dataSource = new MatTableDataSource<Offer>(this.offers);
    });
  }
  toggleOffer(element: Offer) {
    if (element.id !== undefined && element.enabled !== undefined) {
      if (element.enabled) {
        this.enableOffer(element.id);
      } else {
        this.disableOffer(element.id);
      }
    } else {
      console.error('element undefined');
    }
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

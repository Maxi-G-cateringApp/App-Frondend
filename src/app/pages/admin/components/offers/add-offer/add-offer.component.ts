import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../../core/services/master.service';
import { FoodCombo } from '../../../models/combo.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Offer } from '../../../models/offer.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css',
})
export class AddOfferComponent implements OnInit {
  foodCombos!: FoodCombo[];
  offerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private ref: MatDialogRef<AddOfferComponent>
  ) {}

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      offerName: ['', Validators.required],
      discount: [0, Validators.required],
      comboId: ['', Validators.required],
    });

    this.loadFoodComboItems();
  }

  onCreateOffer() {
    const offer: Offer = {
      offerName: this.offerForm.value.offerName,
      discount: this.offerForm.value.discount,
      comboId: this.offerForm.value.comboId,
    };

    if (this.offerForm.valid) {
      console.log(offer, 'offerrrrrr');
      this.masterService.createOffer(offer).subscribe((res) => {
        console.log(res, 'responseeee');
        this.closePopup();
      });
    }
  }

  loadFoodComboItems() {
    this.masterService.getAllCombos().subscribe((response) => {
      this.foodCombos = response;
    });
  }

  closePopup() {
    this.ref.close();
  }
}

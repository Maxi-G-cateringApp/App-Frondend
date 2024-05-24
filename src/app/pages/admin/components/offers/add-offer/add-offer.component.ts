import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../../core/services/master.service';
import { FoodCombo } from '../../../models/combo.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Offer } from '../../../models/offer.model';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css',
})
export class AddOfferComponent implements OnInit {
  foodCombos!: FoodCombo[];
  offerForm!: FormGroup;
  inputData: any;
  editdata!: Offer;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private ref: MatDialogRef<AddOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tost: ToastrService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.isEdit) {
      this.setupPopupData(this.inputData.id);
    }
    this.offerForm = this.fb.group({
      offerName: ['', Validators.required],
      discount: [0, Validators.required],
      comboId: ['', Validators.required],
    });

    this.loadFoodComboItems();
  }
  setupPopupData(id: number) {
    this.masterService.getOfferById(id).subscribe((data) => {
      this.editdata = data;
      this.offerForm.patchValue({
        offerName: this.editdata.offerName,
        discount: this.editdata.discount,
      });
    });
  }

  onCreateOffer() {
    if (this.inputData.isEdit) {
      this.editOffer(this.inputData.id);
    } else {
      const offer: Offer = {
        offerName: this.offerForm.value.offerName,
        discount: this.offerForm.value.discount,
        comboId: this.offerForm.value.comboId,
      };
      if (this.offerForm.valid) {
        this.masterService.createOffer(offer).subscribe((res) => {
          this.closePopup();
        });
      }
    }
  }

  editOffer(id: number) {
    this.masterService.editOffer(id, this.offerForm.value).subscribe((res) => {
      if (res.status === true) {
        this.tost.success('update offer success', 'updated');
        this.closePopup();
      } else {
        this.tost.error('update offer Failed', 'Failed');
      }
    });
  }

  loadFoodComboItems() {
    this.masterService.getAllCombosWithoutOffer().subscribe((response) => {
      this.foodCombos = response;
      console.log(this.foodCombos);
    });
  }

  closePopup() {
    this.ref.close();
  }
}

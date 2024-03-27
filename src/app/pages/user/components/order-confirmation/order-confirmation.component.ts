import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchPlaceResult } from '../../models/search-place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../../../core/services/master.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getuserId } from '../../../auth/state/auth.selector';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent implements OnInit, AfterViewInit {
  addressForm!: FormGroup;
  @ViewChild('inputField')
  inputField!: ElementRef;
  @Input() placeholder = '';
  orderId!: string;
  advanceAmount!: number;
  result!: SearchPlaceResult;
  userId!: any;

  autoComplete: google.maps.places.Autocomplete | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(getuserId).subscribe((data) => {
      this.userId = data;
    });

    this.route.params.subscribe((params) => {
      this.orderId = params['orderId'];
      console.log('Order ID:', this.orderId);
    });

    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      place: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.autoComplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete?.getPlace();
      console.log(place);
      this.result = {
        latitude: place?.geometry?.location?.lat(),
        longitude: place?.geometry?.location?.lng(),
        name: place?.name,
      };
      console.log(this.result);
    });
  }

  onConfirmOrder() {
    const data = {
      address: this.addressForm.value.address,
      place: this.addressForm.value.place,
      district: this.addressForm.value.district,
      latitude: this.result.latitude,
      longitude: this.result.longitude,
      name: this.result.name,
      userId: this.userId,
      orderId: this.orderId,
    };

    this.masterService.addLocation(data).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/user/order-success']);
      },
      error: (error) => {
        console.error('Something wrong:', error);
      },
    });
  }
}

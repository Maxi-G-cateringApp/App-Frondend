import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SearchPlaceResult } from '../../models/search-place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../../../core/services/master.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { getuserId } from '../../../auth/state/auth.selector';
import Swal from 'sweetalert2';

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
  amount!: number;
  result!: SearchPlaceResult;
  userId!: any;
  loc: any;

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
    this.getAmount();

    this.addressForm = this.fb.group({
      address: ['', [Validators.required, this.whiteSpaceValidator]],
      place: ['', [Validators.required, this.whiteSpaceValidator]],
      district: ['', [Validators.required, this.whiteSpaceValidator]],
    });
  }

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }

  getAmount() {
    this.masterService.getTotalAmount(this.orderId).subscribe((response) => {
      console.log(response, 'may be amount');

      this.amount = response.amount;
      this.advanceAmount = (this.amount * 25) / 100;
    });
  }

  ngAfterViewInit(): void {
    this.autoComplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete?.getPlace();
      this.result = {
        latitude: place?.geometry?.location?.lat(),
        longitude: place?.geometry?.location?.lng(),
        name: place?.name,
      };
      console.log(this.result);
    });
  }

  onConfirmOrder() {
    Swal.fire({
      title: 'Do you want to confirm the order?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save Order',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
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
            Swal.fire('Order Placed!', '', 'success');
            this.router.navigate(['/user/orders']);
          },
          error: (error) => {
            console.error('Something wrong:', error);
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Order Not Placed', '', 'info');
      }
    });
  }
}

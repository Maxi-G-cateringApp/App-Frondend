import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { ReviewModel } from '../../../models/rating.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../shared/app.state';
import { getuserId } from '../../../../auth/state/auth.selector';
import { MasterService } from '../../../../../core/services/master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{

  reviewForm!: FormGroup;
  rating!: number;
  userId!: string;
  @Input() orderId: string = '';
  

  constructor(private fb: FormBuilder,private store: Store<AppState>,private masterService: MasterService){

  }


  ngOnInit(): void {
    this.store.select(getuserId).subscribe((data) => {
      if (data) {
        this.userId = data;
      }
    });

    this.reviewForm = this.fb.group({
      review: ['', [Validators.required, this.whiteSpaceValidator]],
    });
  }
  
  handle(event: number){
    this.rating = event;
  }
  

  reviewSubmit(){
    const rating: ReviewModel = {
      review: this.reviewForm.value.review,
      rating: this.rating,
      orderId: this.orderId,
      userId: this.userId
    }
    
    this.masterService.giveReview(rating).subscribe({next:(response)=>{
      console.log(response);
      Swal.fire({
        title: "Good job!",
        text: "Your Rating is added!",
        icon: "success"
      });
      
    }})


  }

  

  public whiteSpaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }

}

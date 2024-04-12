import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnInit {
  @Input() maxRating = 5;
  @Input() selectedStar = 0;
  maxRatingArr: any = [];
  previousSelection = 0;
  @Output() onRating: EventEmitter<number> = new EventEmitter<number>()

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }

  handleMouseEnter(index: number) {
    this.selectedStar = index + 1;
  }
  handleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.selectedStar = this.previousSelection;
    } else {
      this.selectedStar = 0;
    }
  }
  rating(index: number) {
    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar;
    this.onRating.emit(this.selectedStar);
  }
}

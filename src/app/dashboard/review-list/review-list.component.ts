import { Component, OnInit } from '@angular/core';
import { firebaseStorage } from '../firebaseStorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  public reviews: any[] = [];

  constructor(private firebaseService: firebaseStorage) { }

  ngOnInit(): void {
    this.firebaseService.getReviewsWithKeys().subscribe(reviews => {
      this.reviews = reviews;
      console.log('reviews', reviews);
    });
  }

  selectReview(review: any) {
    this.firebaseService.setSelectedReview(review);
  }

  deleteReview(review: any) {
    Swal.fire({
      title: "Are you sure? You wanna delete this review",
      width: 600,
      padding: "3em",
      color: "#f66f4d",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f66f4d',
      background: "#fff url(/images/trees.png)",
      backdrop: `
      rgb(250 169 148 / 40%)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete method here
        console.log('delete review', review);
        this.firebaseService.deleteReview(review.key, review.imageUrls)
      } else {
        // Handle cancel action
      }

    });
  }
}

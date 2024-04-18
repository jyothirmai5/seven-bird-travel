import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { firebaseStorage } from '../firebaseStorage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviewForm: Observable<any[]>;
  selectedReview?: any;

  reviewFormGroup: FormGroup = new FormGroup({
    reviewMessage: new FormControl('', [Validators.required]),
    imageCaption: new FormControl(''),
  })

  images: File[] = [];

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private firebaseService: firebaseStorage) {
    this.reviewForm = this.db.list('reviewForm').valueChanges();
    this.firebaseService.getSelectedReview().subscribe(review => {
      this.selectedReview = review;
      if (review) {
        this.images = this.selectedReview?.imageUrls;
        this.reviewFormGroup.patchValue({
          reviewMessage: review.reviewMessage,
          imageCaption: review.imageCaption
        });
      }
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.images = Array.from(files);
      this.reviewFormGroup.patchValue({
        images: this.images
      });
    }
  }

  async onSubmit() {
    const reviewMessage = this.reviewFormGroup.value.reviewMessage;
    const imageCaptions = this.reviewFormGroup.value.imageCaption;
    const images = this.images;
    if (this.selectedReview) {
      try {
        await this.firebaseService.updateReview(this.selectedReview.key, this.reviewFormGroup.value, images, this.selectedReview?.imageUrls);
        console.log('Review updated successfully.');
        // Reset form after successful upload
        this.images = [];
        this.clearSelectedReview();
      } catch (error) {
        console.error('Error uploading review:', error);
        // Handle error
      }
    } else {
      if (this.reviewFormGroup.valid) {
        try {
          await this.firebaseService.uploadReview(images, reviewMessage, imageCaptions);
          console.log('Review uploaded successfully.');
          // Reset form after successful upload
          this.reviewFormGroup.reset();
          this.images = [];
        } catch (error) {
          console.error('Error uploading review:', error);
          // Handle error
        }
      }
    }
  }

  clearSelectedReview() {
    this.firebaseService.setSelectedReview(undefined);
    this.reviewFormGroup.reset();
  }
}

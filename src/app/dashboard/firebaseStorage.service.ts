import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class firebaseStorage {
    private selectedReviewSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private fireStorage: AngularFireStorage, private db: AngularFireDatabase) { }

    getSelectedReview() {
        return this.selectedReviewSubject.asObservable();
    }

    setSelectedReview(review: any) {
        this.selectedReviewSubject.next(review);
    }

    getReviews(): Observable<any[]> {
        return this.db.list('reviews').valueChanges();
    }

    getReviewsWithKeys() {
        return this.db.list('/reviews').snapshotChanges().pipe(
            map(actions => {
                return actions.map(action => {
                    const key = action.key;
                    const data: any = action.payload.val();
                    return { key, ...data };
                });
            })
        );
    }

    async uploadReview(images: File[], reviewMessage: string, imageCaption: string): Promise<void> {

        // Upload images to Firebase Storage
        const imageUrls = await this.uploadMultipleImages(images);

        // Save review data to Firebase Realtime Database
        return new Promise<void>((resolve, reject) => {
            this.db.list('/reviews').push({
                reviewMessage: reviewMessage,
                imageUrls: imageUrls,
                imageCaption: imageCaption
            }).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }


    async updateReview(reviewId: string, updatedReviewData: any, newImages: File[], oldImages: string[]): Promise<void> {
        try {
            // Check if there are new images
            if (newImages.length > 0) {
                // Upload new images to Firebase Storage
                const newImageUrls = await this.uploadMultipleImages(newImages);
                console.log('display old image urls', oldImages);

                // Merge new image URLs with existing image URLs
                updatedReviewData.imageUrls = [...oldImages, ...newImageUrls];
            }

            // Update review data in Firebase Realtime Database
            await this.db.object(`/reviews/${reviewId}`).update(updatedReviewData);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async deleteReview(reviewId: string, imageUrls: string[]): Promise<void> {
        try {
            // Remove review data from Firebase Realtime Database
            await this.db.object(`/reviews/${reviewId}`).remove();

            // Delete associated images from Firebase Storage
            for (const imageUrl of imageUrls) {
                await this.fireStorage.refFromURL(imageUrl).delete().toPromise();
            }

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async uploadMultipleImages(files: File[]): Promise<string[]> {
        const urls: string[] = [];

        for (const file of files) {
            if (file) {
                const path = `images/${file.name}`;
                const uploadTask = await this.fireStorage.upload(path, file);
                const url = await uploadTask.ref.getDownloadURL();
                urls.push(url);
            }
        }

        return urls;
    }
}
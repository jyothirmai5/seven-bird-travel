import { Component, OnInit } from '@angular/core';
import { MapboxService } from '../../map.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  constructor(private mapService: MapboxService) { }
  categories = [];
  selectedCategories = ['restaurant'];
  places: any[] = [];
  selectedLocation?: any;

  ngOnInit(): void {
    this.selectedLocation = this.mapService.selectedLocation;
    this.mapService.getAllCategories().subscribe((result) => {
      this.categories = result.listItems;
    });
    this.onSelectedCategoriesChange();
  }

  onSelectedCategoriesChange(): void {
    if (this.selectedCategories.length > 0) {
      // Use RxJS operators to handle changes and debounce the API calls
      const proximity = this.selectedLocation.geometry.coordinates.join(',');
      this.mapService
        .getPOIByCategory(this.selectedCategories, this.selectedLocation.bbox, proximity)
        // .pipe(
        //   debounceTime(300), // Adjust the debounce time as needed
        //   distinctUntilChanged(),
        //   switchMap(() => this.mapService.getPOIByCategory(this.selectedCategories, this.selectedLocation.bbox, proximity))
        // )
        .subscribe(response => {
          // Handle the API response here
          this.places = response.features;
        });
    } else {
      this.places = [];
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MapboxService } from '../../map.service';
import { debounceTime, distinctUntilChanged, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  constructor(private mapService: MapboxService) { }
  categories = [];
  selectedCategories = [];
  places: any[] = [];
  ngOnInit(): void {
    this.mapService.getAllCategories().subscribe((result) => {
      this.categories = result.listItems;
      console.log('result from categories', result);
    });

  }

  onSelectedCategoriesChange(): void {
    // Use RxJS operators to handle changes and debounce the API calls
    this.mapService
      .getPOIByCategory(this.selectedCategories)
      .pipe(
        debounceTime(300), // Adjust the debounce time as needed
        distinctUntilChanged(),
        switchMap(() => this.mapService.getPOIByCategory(this.selectedCategories))
      )
      .subscribe(response => {
        // Handle the API response here
        console.log('get POI', response);
        response.features.map((feature: any) => {
          if (feature.geometry.coordinates) {
            const latitude = feature.geometry.coordinates[1];
            const longitude = feature.geometry.coordinates[0];
            const category = feature.properties.poi_category_ids[0];

          }
        })
      });
  }
}

import { AfterViewInit, Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Router } from '@angular/router';
import { MapboxService } from '../map.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-destinations',
  templateUrl: './search-destinations.component.html',
  styleUrl: './search-destinations.component.css'
})
export class SearchDestinationsComponent implements AfterViewInit {
  searchResults?: any;
  selectedDate: string;
  minDate: string;

  constructor(private router: Router, private mapService: MapboxService) {
    this.minDate = this.getCurrentDate();
    this.selectedDate = this.getCurrentDate();
  }
  ngAfterViewInit() {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'country,region,place,postcode,locality,neighborhood'
    });

    // Add the control to the map.
    geocoder.addTo('#geocoder');

    geocoder.on('result', (e) => {
      this.searchResults = e.result;
      this.mapService.selectedLocation = e.result;
    });

    geocoder.on('clear', () => {
      this.searchResults = undefined;
      this.mapService.selectedLocation = undefined;
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    // Add leading zeros for single-digit months and days
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  onSearch() {
    if (this.searchResults && this.selectedDate) {
      this.router.navigate(['/dashboard/trip-details']);
    } else {
      Swal.fire({
        title: "Please select the location and the date",
        width: 600,
        padding: "3em",
        color: "#f66f4d",
        icon: 'warning',
        confirmButtonColor: '#f66f4d',
        background: "#fff url(/images/trees.png)",
        backdrop: `
        rgb(250 169 148 / 40%)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    }
  }
}

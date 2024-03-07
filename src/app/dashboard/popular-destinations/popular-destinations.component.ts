import { Component, OnInit } from '@angular/core';
import { MapboxService } from '../map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destinations.component.html',
  styleUrl: './popular-destinations.component.css'
})
export class PopularDestinationsComponent {
  popularCities = [
    {
      name: 'Ottawa',
      country: 'Canada',
      image: '/assets/ottawa.jpg'
    },
    {
      name: 'Washington',
      country: 'US',
      image: '/assets/washington.jpg'
    },
    {
      name: 'London',
      country: 'UK',
      image: '/assets/london.jpg'
    },
    {
      name: 'Abu Dhabi',
      country: 'UAE',
      image: '/assets/abudhabi.jpg'
    },
    {
      name: 'Rome',
      country: 'Italy',
      image: '/assets/rome.jpg'
    }
  ];
  constructor(private mapService: MapboxService, private router: Router) {

  }

  redirectToMap(city: string) {
    this.mapService.getCountries(city).subscribe(
      (data) => {
        this.mapService.selectedLocation = data.features[0];
        console.log(data.features[0]);
        this.router.navigate(['/dashboard/trip-details']);
      },
      (error) => console.error('Error fetching country data:', error)
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { MapboxService } from '../map.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent implements OnInit {
  constructor(private mapService: MapboxService) {

  }
  ngOnInit(): void {

  }
}

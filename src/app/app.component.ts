import { Component, OnInit } from '@angular/core';
import { MapboxService } from './dashboard/map.service';
import { environment } from '../environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'seven-bird-travel';

  constructor(private mapboxService: MapboxService) { }

  ngOnInit() {
    
    const dynamicAccessToken = environment.mapboxAccessToken;
    this.mapboxService.initializeMapbox(dynamicAccessToken);
    console.log('in on init App');

  }
}

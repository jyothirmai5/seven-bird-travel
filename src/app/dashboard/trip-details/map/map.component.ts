import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapboxService } from '../../map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  selectedLocation?: any;
  constructor(private mapService: MapboxService, private router: Router) {
  }

  ngOnInit() {
    this.selectedLocation = this.mapService.selectedLocation;
  }

  ngAfterViewInit() {
    if (this.selectedLocation) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.selectedLocation.center,
        zoom: 13
      });

      const marker = new mapboxgl.Marker() // Initialize a new marker
        .setLngLat(this.selectedLocation.geometry.coordinates) // Marker [lng, lat] coordinates
        .addTo(map); // Add the marker to the map
      map.on('load', () => {
        map.addSource('single-point', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });

        map.addLayer({
          id: 'point',
          source: 'single-point',
          type: 'circle',
          paint: {
            'circle-radius': 10,
            'circle-color': '#448ee4'
          }
        });
      });
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false, // Do not use the default marker style
        placeholder: 'Search for places in ' + this.selectedLocation.place_name, // Placeholder text for the search bar
        bbox: this.selectedLocation.bbox, // Boundary for Berkeley
        proximity: {
          longitude: this.selectedLocation.geometry.coordinates[0],
          latitude: this.selectedLocation.geometry.coordinates[1]
        }
      });

      map.addControl(geocoder);
      geocoder.on('result', (event) => {
        const geojsonSource = map.getSource('single-point') as mapboxgl.GeoJSONSource;
        geojsonSource.setData(event.result.geometry);
      });
    } else {
      this.router.navigate(['/dashboard/home']);
    }
  }
}

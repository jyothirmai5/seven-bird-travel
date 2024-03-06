import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapboxService {
    private accessToken = '';
    public selectedLocation = undefined;
    public selectedCategories = new BehaviorSubject<Array<string>>([]);

    private apiUrl = 'https://api.mapbox.com/search/searchbox/v1';

    constructor(private http: HttpClient) { }

    initializeMapbox(accessToken: string): void {
        this.accessToken = accessToken;
        mapboxgl.accessToken = accessToken;
    }

    getAccessToken(): string {
        return this.accessToken;
    }

    getAllCategories(): Observable<any> {
        const url = `${this.apiUrl}/list/category?access_token=${this.accessToken}`;
        return this.http.get(url);
    }

    getPOIByCategory(category_array: Array<string>): Observable<any> {
        const params = category_array.join(',');
        const url = `https://api.mapbox.com/search/searchbox/v1/category/${params}?access_token=${this.accessToken}`;
        return this.http.get(url);
    }
}
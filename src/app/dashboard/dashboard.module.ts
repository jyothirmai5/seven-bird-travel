import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SearchDestinationsComponent } from './search-destinations/search-destinations.component';
import { DashboardComponent } from './dashboard.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MapComponent } from './trip-details/map/map.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { SearchResultsComponent } from './trip-details/search-results/search-results.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchDestinationsComponent,
    PopularDestinationsComponent,
    NewsletterComponent,
    ContactFormComponent,
    AboutUsComponent,
    TripDetailsComponent,
    SearchResultsComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    RouterModule,
    NgSelectModule,
    FormsModule
  ]
})
export class DashboardModule { }

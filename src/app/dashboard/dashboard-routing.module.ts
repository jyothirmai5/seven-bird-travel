import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: DashboardComponent,
  },
  {
    path: 'trip-details', component: TripDetailsComponent
  },
  {
    path: 'about', component: AboutUsComponent
  },
  {
    path: 'contact', component: ContactFormComponent
  },
  {
    path: 'review', component: ReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

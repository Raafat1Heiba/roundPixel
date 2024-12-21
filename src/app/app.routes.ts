import { Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { HomeComponent } from './components/home/home.component';
import { FlightDetailsComponent } from './components/results/flight-details/flight-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'results',
    component: ResultsComponent,
  },
  {
    path: 'results/:flightId',
    component: FlightDetailsComponent,
  },
];

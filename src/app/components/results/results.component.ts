import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightService } from '../../services/flight.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterModule, FlightCardComponent, SideBarComponent, CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  displayedFlights = computed(() => {
    // هنا يتم وضع الكود
    console.log('filteredFlights:', this.flightService.filteredFlights());
    console.log('flights:', this.flightService.flights());

    const filteredFlights = this.flightService.filteredFlights();

    if (!filteredFlights || !this.flightService.flights()) {
      console.error(
        'Error: Unable to retrieve flight data from FlightService signals.'
      );
      return [];
    }

    return filteredFlights.length > 0
      ? filteredFlights
      : this.flightService.flights();
  });

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.flightService.getData().subscribe({
      next: (response) => {
        console.log('Data received:', response);
        this.flightService.calculateTotalPrices();
        console.log(
          'Flights after price calculation:',
          this.flightService.flights()
        );
      },
      error: (error) => {
        console.error('Error loading JSON file:', error);
      },
    });
  }
}

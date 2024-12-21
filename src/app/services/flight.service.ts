import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IAirItinerary } from '../models/airitineraris.model';
import { initialFilter } from '../constans/filter.initial';
import { IFilter } from '../models/filter.model';
import { IData } from '../models/data.model';
import { calculateTotalPrice } from '../func/calcPrice';
import { bubbleSort } from '../func/sort';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  jsonData = '../../assets/response.json';
  flights: WritableSignal<IAirItinerary[]> = signal([]);
  filteredFlights: WritableSignal<IAirItinerary[]> = signal([]);
  filteringElements: WritableSignal<IFilter> = signal(initialFilter);
  allPrices: WritableSignal<number[]> = signal([]);
  airlines: WritableSignal<string[]> = signal([]);
  airItineraries: WritableSignal<IAirItinerary[]> = signal([]);

  private flightsLoaded = signal(false);

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    return this.httpClient.get<IData>(this.jsonData).pipe(
      tap((data) => {
        this.flights.set(data.airItineraries);
        this.calculateTotalPrices();
      })
    );
  }

  calculateTotalPrices(): void {
    const flights = this.flights();
    const updatedFlights = flights.map((flight) => {
      flight.totalPrice = calculateTotalPrice(flight);
      return flight;
    });

    this.flights.set(updatedFlights);
  }

  getFlightById(flightId: number): IAirItinerary | undefined {
    if (this.flights().length === 0) {
      console.error('Flights data is empty!');
      return undefined;
    }

    const flight = this.flights().find(
      (flight) => flight.sequenceNum === flightId
    );
    console.log('Searched Flight:', flight);

    return flight;
  }

  filterFlights() {
    const { minValue, maxValue, stops, isRefundable, airline } =
      this.filteringElements();

    this.filteredFlights.set(
      this.flights().filter((flight) => {
        if (flight.totalPrice < minValue || flight.totalPrice > maxValue) {
          return false;
        }

        if (
          stops.length &&
          !stops.includes(flight.allJourney.flights[0].stopsNum)
        ) {
          return false;
        }

        if (isRefundable !== 'both' && flight.isRefundable !== isRefundable) {
          return false;
        }

        if (
          airline &&
          flight.allJourney.flights[0].flightAirline.airlineName !== airline
        ) {
          return false;
        }

        return true;
      })
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterByAirlineName(airline: string | null) {
    this.filteringElements.update((filter) => ({
      ...filter,
      airline,
    }));
    this.filterFlights();
  }

  filterByPrice(max: number, min: number) {
    console.log('Filter by Price called with:', { min, max });

    this.filteringElements.update((filter) => ({
      ...filter,
      maxValue: max,
      minValue: min,
    }));

    console.log('Updated filteringElements:', this.filteringElements());

    this.filterFlights();
  }

  filterByStops(stops: number[]) {
    this.filteringElements.update((filter) => ({
      ...filter,
      stops: stops,
    }));
    this.filterFlights();
  }

  filterByRefund(value: true | false | 'both') {
    this.filteringElements.update((filter) => ({
      ...filter,
      isRefundable: value,
    }));
    this.filterFlights();
  }
}

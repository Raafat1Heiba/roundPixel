import { Component, WritableSignal, signal } from '@angular/core';
import { ICard } from '../../../models/card.model';
import { initialCard } from '../../../constans/card.initial';
import { IAirItinerary } from '../../../models/airitineraris.model';
import { FlightService } from '../../../services/flight.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css',
  imports: [DurationPipe, DatePipe, CommonModule, RouterLink, RouterModule],
})
export class FlightDetailsComponent {
  flight: WritableSignal<IAirItinerary | null> = signal<IAirItinerary | null>(
    null
  );
  card: ICard = initialCard;
  bookingSuccessMessage: string = '';
  bookingInProgress: boolean = false;

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const flightId = Number(this.route.snapshot.paramMap.get('flightId'));
    console.log(flightId);
    console.log('Flight ID from URL:', flightId);

    this.flightService.getData().subscribe({
      next: () => {
        const flightItem = this.flightService.getFlightById(flightId);
        this.flight.set(flightItem ?? null);

        if (flightItem) {
          const flight = flightItem.allJourney.flights[0];
          this.card = {
            flightNumber: flight.flightDTO[0].flightInfo.flightNumber,
            airlineLogo: flight.flightAirline.airlineLogo,
            airlineCode: flight.flightAirline.airlineCode,
            airlineName: flight.flightAirline.airlineName,
            arrivalAirportCode:
              flight.flightDTO[0].arrivalTerminalAirport.airportCode,
            departureAirportCode:
              flight.flightDTO[0].departureTerminalAirport.airportCode,
            deptDate: flightItem.deptDate,
            arrivalDate: flightItem.arrivalDate,
            stops: flight.stopsNum,
            price: flightItem.totalPrice,
            totalDuration: flightItem.totalDuration,
          };
        }
      },
      error: (err) => console.error('Error loading flights:', err),
    });
  }
  bookTicket() {
    this.bookingInProgress = true;
    this.bookingSuccessMessage = 'Booking Successful!';

    setTimeout(() => {
      this.bookingSuccessMessage = '';
      this.bookingInProgress = false;
    }, 3000);
  }
}

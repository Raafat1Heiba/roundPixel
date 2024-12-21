import { Injectable } from '@angular/core';
import { IAirItinerary } from '../models/airitineraris.model';
import { ICard } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getCardDetails(flight: IAirItinerary): ICard {
    const air = flight.allJourney.flights[0];
    const card: ICard = {
      flightNumber: air.flightDTO[0].flightInfo.flightNumber,
      airlineLogo: air.flightAirline.airlineLogo,
      airlineCode: air.flightAirline.airlineCode,
      airlineName: air.flightAirline.airlineName,
      arrivalAirportCode: air.flightDTO[0].arrivalTerminalAirport.airportCode,
      departureAirportCode:
        air.flightDTO[0].departureTerminalAirport.airportCode,
      deptDate: flight.deptDate,
      arrivalDate: flight.arrivalDate,
      stops: air.stopsNum,
      price: flight.totalPrice,
      totalDuration: flight.totalDuration,
    };

    if (air.stopsNum) {
      card.arrivalAirportCode =
        air.flightDTO[1].arrivalTerminalAirport.airportCode;
    } else {
      card.arrivalAirportCode =
        air.flightDTO[0].arrivalTerminalAirport.airportCode;
    }

    return card;
  }
}

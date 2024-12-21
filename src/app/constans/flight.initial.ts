import { IFlight } from '../models/flight.model';
import { initialAirline } from './airline.initial';

export const initialFlight: IFlight = {
  flightDTO: [],
  flightAirline: initialAirline,
  elapsedTime: 0,
  stopsNum: 0,
};

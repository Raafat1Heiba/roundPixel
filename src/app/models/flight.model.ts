import { IAirline } from './airline.model';
import { IFlightDTO } from './flightDTO.model';

export interface IFlight {
  flightDTO: IFlightDTO[];
  flightAirline: IAirline;
  elapsedTime: number;
  stopsNum: number;
}

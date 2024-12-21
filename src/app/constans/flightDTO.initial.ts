import { IFlightDTO } from '../models/flightDTO.model';
import { initialTerminalAirport } from './terminalAirport.initial';
import { initialFlightInfo } from './flightInfo.initial';
import { initialSegmentDetails } from './segmentDetails.initial';
import { initialAirline } from './airline.initial';

export const initialFlightDTO: IFlightDTO = {
  departureOffset: 0,
  arrivalOffset: 0,
  isStopSegment: false,
  deptTime: '',
  landTime: '',
  departureDate: '',
  arrivalDate: '',
  flightAirline: initialAirline,
  operatedAirline: null,
  durationPerLeg: 0,
  departureTerminalAirport: initialTerminalAirport,
  arrivalTerminalAirport: initialTerminalAirport,
  transitTime: '',
  flightInfo: initialFlightInfo,
  segmentDetails: initialSegmentDetails,
  supplierRefID: null,
};

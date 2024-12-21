import { IAirline } from './airline.model';
import { IFlightInfo } from './flightInfo.model';
import { ISegmentDetails } from './segmentDetails.model';
import { ITerminalAirport } from './terminalAirport.model';

export interface IFlightDTO {
  departureOffset: number;
  arrivalOffset: number;
  isStopSegment: boolean;
  deptTime: string;
  landTime: string;
  departureDate: string;
  arrivalDate: string;
  flightAirline: IAirline;
  operatedAirline: IAirline | null;
  durationPerLeg: number;
  departureTerminalAirport: ITerminalAirport;
  arrivalTerminalAirport: ITerminalAirport;
  transitTime: string;
  flightInfo: IFlightInfo;
  segmentDetails: ISegmentDetails;
  supplierRefID: string | null;
}

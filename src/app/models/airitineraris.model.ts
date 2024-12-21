import { IAllJourney } from './allJourney.model';
import { IBaggageInformation } from './baggageInformation.model';
import { IItinTotalFare } from './itinTotalFare.model';
import { IPassengerFareBreakDownDTO } from './passengerFareBreakDownDTO.model';

export interface IAirItinerary {
  sequenceNum: number;
  pKey: string;
  isRefundable: boolean;
  itinTotalFare: IItinTotalFare;
  totalDuration: number;
  deptDate: string;
  arrivalDate: string;
  cabinClass: string;
  flightType: string;
  allJourney: IAllJourney;
  baggageInformation: IBaggageInformation[];
  passengerFareBreakDownDTOs: IPassengerFareBreakDownDTO[];
  totalPrice: number;
}

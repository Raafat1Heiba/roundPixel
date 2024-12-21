import { IAirItinerary } from '../models/airitineraris.model';
import { initialItinTotalFare } from './itinTotalFare.initial';
import { initialAllJourney } from './allJourney.initial';

export const initialAirItinerary: IAirItinerary = {
  sequenceNum: 0,
  pKey: '',
  isRefundable: false,
  itinTotalFare: initialItinTotalFare,
  totalDuration: 0,
  deptDate: '',
  arrivalDate: '',
  cabinClass: '',
  flightType: '',
  allJourney: initialAllJourney,
  baggageInformation: [],
  passengerFareBreakDownDTOs: [],
  totalPrice: 0,
};

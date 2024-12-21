import { IAirItinerary } from '../models/airitineraris.model';

export function calculateTotalPrice(itinerary: IAirItinerary): number {
  let totalPriceEGP = 0;

  itinerary.passengerFareBreakDownDTOs.forEach((passengerFare) => {
    passengerFare.flightFaresDTOs.forEach((fare) => {
      switch (fare.currencyCode) {
        case 'EGP':
          totalPriceEGP += fare.fareAmount;
          break;
        case 'KWD':
          totalPriceEGP += fare.fareAmount * 159.21;
          break;
        case 'USD':
          totalPriceEGP += fare.fareAmount * 48.45;
          break;
        case 'SAR':
          totalPriceEGP += fare.fareAmount * 12.91;
          break;
      }
    });
  });

  return totalPriceEGP;
}

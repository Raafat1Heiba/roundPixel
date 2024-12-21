export interface ICard {
  airlineLogo: string | null;
  airlineName: string | null;
  airlineCode: string | null;
  flightNumber: string;
  deptDate: string;
  arrivalDate: string;
  departureAirportCode: string;
  departureAirportName?: string;
  arrivalAirportCode: string;
  arrivalAirportName?: string;
  stops: number;
  price: number;
  isRefundable?: boolean;
  cabinClass?: string;
  totalDuration: number;
}

export interface IBaggageInformation {
  baggage: string;
  childBaggage: string | null;
  infantBaggage: string | null;
  airlineName: string;
  deptCity: string;
  landCity: string;
  flightNum: string;
}

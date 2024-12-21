import { IFilter } from '../models/filter.model';

export const initialFilter: IFilter = {
  maxValue: 0,
  minValue: 0,
  isRefundable: 'both',
  stops: [],
  airline: null,
};

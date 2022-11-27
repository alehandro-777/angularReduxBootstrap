import { createReducer, on } from '@ngrx/store';
import { TemperaturePacket } from '../features/dashboards/temperature-map/temperature-map.models';
import * as actions from './temperatures.actions'

export const initialState: TemperaturePacket = {
    data:[]
};
 
export const wheaterForecastReducer = createReducer(
  initialState,
  on(actions.loadApiSuccess, (state, { payload }) => payload),
  on(actions.loadApiError, (state, { code }) => { return { data:[] }} ),
);
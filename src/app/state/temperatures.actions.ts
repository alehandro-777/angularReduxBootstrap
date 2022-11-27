import { createAction, props } from '@ngrx/store';
import { TemperaturePacket } from '../features/dashboards/temperature-map/temperature-map.models';

 
export const loadApidata = createAction(
  '[WeatherForecast] Load',
  //props<{ url:string }>()
);

export const loadApiSuccess = createAction(
  '[WeatherForecast] Load Sucess',
    props<{ payload:TemperaturePacket }>()
);

export const loadApiError = createAction(
  '[WeatherForecast] Load Error',
props<{ code: number }>()
);
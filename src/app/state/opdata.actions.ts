import { createAction, props } from '@ngrx/store';
import { OpDataPacket } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
 
export const loadOpdata = createAction(
  '[Opdata] Load',
  props<{ url:string }>()
);

export const loadOpSuccess = createAction(
  '[Opdata] Load Sucess',
    props<{ payload:OpDataPacket }>()
);

export const loadOpdataError = createAction(
  '[Opdata] Load Error',
props<{ code: number }>()
);
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TemperaturePacket, Value } from '../features/dashboards/temperature-map/temperature-map.models';

export const selectWheather = createFeatureSelector<TemperaturePacket>('wheater');

export const selectWheatherMap = createSelector(
    selectWheather,
    (s1: TemperaturePacket)=> {
        const map1 = new Map<string, Value[]>();
        s1.data.forEach(val => {
            map1.set(`${val._id}` , val.values);
        });
        return map1;
    }
    );
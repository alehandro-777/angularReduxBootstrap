import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCalendarDate = createFeatureSelector<NgbDate>('currentDate');

export const selectCalendarDateStruc = createSelector(
    selectCalendarDate,
    (date:NgbDate): NgbDateStruct => {
      return {  
        year: date.year,
        month: date.day,
        day: date.day,
        }
    }
  );
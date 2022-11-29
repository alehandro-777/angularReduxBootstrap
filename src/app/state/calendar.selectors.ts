import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCalendarDate = createFeatureSelector<NgbDate>('currentDate');

export const selectCalendarDateStruc = createSelector(
    selectCalendarDate,
    (date:NgbDate): NgbDateStruct => {
      return {  
        year: date.year,
        month: date.month,
        day: date.day,
        }
    }
  );

  export const selectCalendarDateObject = createSelector(
    selectCalendarDate,
    (date:NgbDate): Date => {
      return new Date(date.year,date.month-1, date.day)
    }
  );

  export const selectCalendarDateIso = createSelector(
    selectCalendarDate,
    (date:NgbDate): string => {
      return  new Date(date.year,date.month-1, date.day).toISOString();
    }
  );
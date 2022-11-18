import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from './datepicker-i18n.service';
import { YearMonth } from './year-month.model';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }], // define custom NgbDatepickerI18n provider
})
export class DatepickerComponent implements OnInit {
	model: NgbDateStruct = {
    year:2022,
    month:1,
    day:1
  };
	date: YearMonth = { year: 2022, month: 1 };

	constructor(private calendar: NgbCalendar) {}

	selectToday() {
		this.model = this.calendar.getToday();
	}

  ngOnInit(): void {
  }

}

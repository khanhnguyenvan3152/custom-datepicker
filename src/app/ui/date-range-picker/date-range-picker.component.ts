import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as dayjs from 'dayjs';
import { Calendar } from 'src/app/ui/calendar/calendar';
@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true,
    },
  ],
})
export class DateRangePickerComponent implements OnInit, ControlValueAccessor {
  @Input() dateFormat = 'DD/MM/YYYY';
  @ViewChild("datePicker") datePicker: Calendar
  onChange: (_: object) => void = () => {};
  onTouched: () => void = () => {};
  value = [];
  title = 'angularsrc';
  startDate = null;
  endDate = null;

  _disabled: boolean;

  constructor(private cdr: ChangeDetectorRef) {

  }

  changeValue(array: Date[]) {
    this.startDate = null;
    this.endDate = null;
    if (array[0]) {
      this.startDate = dayjs(array[0]).format(this.dateFormat)
      console.log(dayjs(array[0]).format(this.dateFormat))
      if (!array[1]) this.endDate = null;
    }
    if (array[1]) {
      this.endDate = dayjs(array[1]).format(this.dateFormat)
    }
    this.cdr.detectChanges();
  }

  countSelectedDay(array: Date[]) {
    if (!array) return 0;

    if (array.length == 2 && array[0] && array[1]) {
      const beginDate = dayjs(array[0]);
      const endDate = dayjs(array[1]);
      return endDate.diff(beginDate, 'day');
    }
    return 0;
  }

  validateDate(format, value) {
    if (format === 'DD/MM/YYYY') return regexDDMMYYYY.test(value);
    if (format === 'MM/DD/YYYY') return regexMMDDYYYY.test(value);
    return false;
  }

  getDateInfo(format, value) {
    const arr = value.split('/');
    if (format === 'MM/DD/YYYY')
      return {
        day: arr[1],
        month: arr[0],
        year: arr[2],
      };
    return {
      day: arr[0],
      month: arr[1],
      year: arr[2],
    };
  }

  generateDate({ day, month, year }: { [key: string]: number }) {
    const date = new Date();
    date.setHours(0, 0, 0);
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    return date;
  }

  changeDate(value: string, prop: string) {
    this[prop] = value;
    const isValid = this.validateDate(this.dateFormat, value);
    if (isValid) {
      const date = dayjs(this.generateDate(this.getDateInfo(this.dateFormat, value))).toDate();
      console.log(date);
      if(prop === 'startDate') {
        this.value[0] = date;
        this.datePicker.updateUI()
      }
      if(prop === 'endDate') {
        this.value[1] = date;
        this.datePicker.updateUI()
      }
    }

    console.log(prop, value);
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  ngOnInit(): void {}

  apply() {
    this.onChange(this.value);
  }
}
export const regexDDMMYYYY = new RegExp(
  /(([1-2][0-9])|([1-9])|(3[0-1]))\/((1[0-2])|([1-9]))\/[0-9]{4}/g
);
export const regexMMDDYYYY = new RegExp(
  /^(0[1-9]|1[0-2])[\/](0[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/g
);

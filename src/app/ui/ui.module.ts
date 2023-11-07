import { NgModule } from '@angular/core';
import { CalendarModule } from 'src/app/ui/calendar/public_api';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CalendarModule,
    CommonModule,
    NgxMaskModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CalendarModule, DateRangePickerComponent],
  declarations: [
    DateRangePickerComponent
  ]
})
export class UiModule {}

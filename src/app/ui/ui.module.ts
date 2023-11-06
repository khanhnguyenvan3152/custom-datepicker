import { NgModule } from '@angular/core';
import { CalendarModule } from 'src/app/ui/calendar/public_api';

@NgModule({
  imports: [
    CalendarModule
  ],
  exports: [CalendarModule]
})
export class UiModule {}

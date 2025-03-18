import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CitasComponent } from './citas/citas.component';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FullCalendarModule } from '@fullcalendar/angular';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CitasComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    BreadcrumbComponent,
    MatButtonModule,
    MatCheckboxModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDialogModule
  ],
  providers: [DatePipe]
})
export class CalendarioModule { }

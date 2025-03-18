import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TareaService } from '@core/service/tarea.service';
import { PusherService } from '@core/service/pusher.service';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { MatDialog } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Calendar } from '@core/models/calendar.model';
//import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from '@core/service/calendar.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { TokenStorageService } from '@core/authentication/token-storage.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import esLocale from '@fullcalendar/core/locales/es';
import { Direction } from '@angular/cdk/bidi';
import { FormCrearTareaComponent } from 'app/dashboard/tareas/form-crear-tarea/form-crear-tarea.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})
export class CitasComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild('calendar', { static: false })
  public calendarioList: any;
  calendar: Calendar | null;
  public addCusForm: UntypedFormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData!: Calendar;
  filterItems: string[] = [
    'work',
    'personal',
    'important',
    'travel',
    'friends',
  ];

  calendarEvents?: EventInput[] = [];

  tempEvents?: EventInput[];

  public filters = [
    { name: 'work', value: 'Work', checked: true },
    { name: 'personal', value: 'Personal', checked: true },
    { name: 'important', value: 'Important', checked: true },
    { name: 'travel', value: 'Travel', checked: true },
    { name: 'friends', value: 'Friends', checked: true },
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      right: 'dayGridMonth',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    locale: esLocale,
    //editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),

    eventContent: function (arg) {
      return {
        html: `
        <div class="fc-event-custom-content">
          <div>${arg.event.title}</div>
        </div>
        `
      };
    }
  };

  constructor(
    public tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private tareasService: TareaService,
    private pusherService: PusherService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {
    super();
    this.dialogTitle = 'Add New Event';
    const blankObject = {} as Calendar;
    this.calendar = new Calendar(blankObject);
    this.addCusForm = this.createCalendarForm(this.calendar);
  }

  public ngOnInit(): void {
    this.listarDatosConsultasCalendario();

    const userId = this.tokenStorage.getUser()?.id;

    this.pusherService.listenToData(userId, (data: any) => {
      this.listarDatosConsultasCalendario();
    });
  }

  public listarDatosConsultasCalendario() {
    this.tareasService.getAll().subscribe(
      data => {
        this.calendarioList = data?.data;
        console.log("CALENDARIO: ", this.calendarioList);
        this.mapearDatosCalendario();
        this.cdr.detectChanges();
      },
      error => {
        console.log(error);
      }
    )
  }

  public mapearDatosCalendario() {
    if (this.calendarioList && this.calendarioList.length > 0) {
      this.calendarioList.forEach(calendario => {
        this.calendarEvents.push({
          id: String(calendario?.id),
          title: "Tarea: "+calendario?.titulo + 
          "<br>" + "Asignado: " + calendario?.user_realiza?.nombre_completo,
          start: this.convertToLocalDate(calendario?.fecha_inicio),
          end: this.convertToNextDay(calendario.fecha_final),
          allDay: false,
          className: "fc-event-success",
          groupId: calendario?.servicio?.nombre,
          details: calendario?.observaciones || '',
        });
      });
      this.tempEvents = [...this.calendarEvents];
      this.calendarOptions.events = [...this.calendarEvents];
    }
  }

  convertToLocalDate(dateString: string): string {
    return new Date(dateString + 'T12:00:00').toISOString().split('T')[0];
  }
  
  convertToNextDay(dateString: string): string {
    let date = new Date(dateString + 'T12:00:00');
    date.setDate(date.getDate() + 1); // 🔹 Sumamos 1 día
    return date.toISOString().split('T')[0];
  }
  

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDateSelect(selectInfo: DateSelectArg) {
    const formattedDate = this.datePipe.transform(selectInfo.start, 'yyyy-MM-dd HH:mm:ss');
    console.log("INICIAL: ", formattedDate);

    this.addNewEvent(formattedDate);
  }

  addNewEvent(fechaCitaSeleccionada: any) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormCrearTareaComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
        estado: false,
        title: 'Nuevo Registro',
        fechaCitaSeleccionada: fechaCitaSeleccionada
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarDatosConsultasCalendario();
      }
    });
  }

  changeCategory(event: MatCheckboxChange, filter: { name: string }) {
    if (event.checked) {
      this.filterItems.push(filter.name);
    } else {
      this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
    }
    this.filterEvent(this.filterItems);
  }

  filterEvent(element: string[]) {
    const list = this.calendarEvents?.filter((x) =>
      element.map((y?: string) => y).includes(x.groupId)
    );

    this.calendarOptions.events = list;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row: EventClickArg) {
    
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(FormCrearTareaComponent, {
      data: {
        //calendar: calendarData,
        action: 'edit',
        estado: true,
        id: row?.event?.id
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log("RESULTADO LLEGADO: ", result);
      if (result === 'submit') {
        this.listarDatosConsultasCalendario();
        this.showNotification(
          'black',
          'Datos de la cita editados...!!!',
          'bottom',
          'center'
        );
        this.addCusForm.reset();
      } else if (result === 'delete') {
        this.calendarEvents?.forEach((element) => {
          if (element.id === row?.event?.id) {
            row.event.remove();
          }
        }, this);

        this.showNotification(
          'snackbar-danger',
          'Cita eliminado...!!!',
          'bottom',
          'center'
        );
        this.listarDatosConsultasCalendario();
      }
    });
  }

  editEvent(eventIndex: number, calendarData: Calendar) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const calendarEvents = this.calendarEvents!.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent['details'] = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array

    this.calendarOptions.events = calendarEvents;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }

  createCalendarForm(calendar: Calendar): UntypedFormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      category: [calendar.category],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getClassNameValue(category: string) {
    let className;

    if (category === 'work') className = 'fc-event-success';
    else if (category === 'personal') className = 'fc-event-warning';
    else if (category === 'important') className = 'fc-event-primary';
    else if (category === 'travel') className = 'fc-event-danger';
    else if (category === 'friends') className = 'fc-event-info';

    return className;
  }
}

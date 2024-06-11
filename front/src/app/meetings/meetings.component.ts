import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { BehaviorSubject } from 'rxjs';


import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';

import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from '../_shared/event-utils';
import { ChangeDetectorRef } from '@angular/core';
import { MeetingService } from '../_services/meeting.service';
@Component({
  selector: 'app-meetings',

  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {
  search: string = '';
  meetings: any =[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;

  calendarVisible = new BehaviorSubject<boolean>(true);
  calendarOptions = new BehaviorSubject<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    contentHeight: '450px',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = new BehaviorSubject<EventApi[]>([]);
 

  constructor(private changeDetector: ChangeDetectorRef, private meetingService: MeetingService) {
  }
  handleCalendarToggle() {
    this.calendarVisible.next(!this.calendarVisible.value);
  }

  handleWeekendsToggle() {
    const currentOptions = this.calendarOptions.value;
    this.calendarOptions.next({
      ...currentOptions,
      weekends: !currentOptions.weekends
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    // Update currentEvents using next()
    this.currentEvents.next(events);

    // Trigger change detection
    this.changeDetector.detectChanges();
  }

 

  ngOnInit(): void {
    this.getAllMetings(this.currentPage);
  }
  getAllMetings(page: number ): void {
    // console.log(' fetching Note:', page);
    this.meetingService.getAllMeetings(page).subscribe({
      next: (response) => {
        this.meetings = response._embedded.meetings;
        this.totalPages = response.page.totalPages;
        console.log(' fetching meeting:', response._embedded.meetings);
      },
      error: (error) => {
        console.error('Error fetching meeting:', error);
 
      }
    });
}

}

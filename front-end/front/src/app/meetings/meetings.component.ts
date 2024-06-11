import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { BehaviorSubject } from 'rxjs';


import { Router, RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';

import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from '../_shared/event-utils';
import { ChangeDetectorRef } from '@angular/core';
import { EntrepriseService } from '../_services/entreprise.service';

import { ActivatedRoute } from '@angular/router';
import {  OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-meetings',

  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent implements OnInit {

  meeting_Entreprise: any;
  totalPages: number = 0;
  //id:number = 1;
  currentPage: number = 0;
  desc: string ='';
  dateCreated:any;
  currentUrl: any;
  calendarEvents:any
  id:any;
  private route = inject(ActivatedRoute);

  //bedut calendrie



  calendarVisible = new BehaviorSubject<boolean>(true);
  calendarOptions = new BehaviorSubject<CalendarOptions>({
    
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    events: [],
    contentHeight: 'auto',
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
    eventsSet: this.handleEvents.bind(this),
    
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = new BehaviorSubject<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, private EntrepriseService: EntrepriseService, private router: Router, private location: Location) {
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
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('le id est:',this.id)
    this.currentUrl = this.location.path().includes('entreprise/details/'+this.id);
    console.log('URL complète : ', this.currentUrl);
    this.appelDeMethode()

  }



  getMettingEntreprises(page: number ): void {
 
    console.log('hello boy')
   this.EntrepriseService.getMettingsEntreprise(page,this.id).subscribe({
     next: (response) => {
        this.meeting_Entreprise = response._embedded.meetings;
        const calendarEvents: EventInput[] = this.meeting_Entreprise.map((meeting:any) => ({
          title: meeting.title,
          start: meeting.startDate,
          end: meeting.endDate
        }));
        this.calendarEvents = calendarEvents
        console.log('le calendarEvent est :', this.calendarEvents)

        const currentOptions = this.calendarOptions.value;

        const updatedOptions: CalendarOptions = {
          ...currentOptions,
          //events: [...currentOptions.events, ...calendarEvents]
        };

          // Mettez à jour calendarOptions avec les nouvelles options
      this.calendarOptions.next(updatedOptions);

    
        this.totalPages = response.totalPages;
        console.log('le content MeetingsEntreprise est:',this.meeting_Entreprise
        )
      
     },
     error: (error) => {
      console.log('le esponse sont:',this.meeting_Entreprise)
       console.error('Error fetching lead:', error);
       // Handle error gracefully (display error message to user, offer retry option)
     }
   });
  }

  getMeetingsEntreprisesCompany(page: number): void {
    console.log('hello boy')
   
    this.EntrepriseService.getMettingsEntrepriseCompany(page,this.id).subscribe({
      next: (response) => {
       console.log('les METTING avec Companys  sont:',response)
         this.meeting_Entreprise = response._embedded.meetings;
         this.totalPages = response.totalPages;
         console.log('lES MEETING COMPANY sont:',this.meeting_Entreprise
         )  
      },
      error: (error) => {
       console.log('le esponse sont:',this.meeting_Entreprise)
        console.error('Error fetching lead:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    })
   }

   appelDeMethode(): void {
    if (this.currentUrl) {
      this.getMeetingsEntreprisesCompany(this.currentPage);
    } else {
      this.getMettingEntreprises(this.currentPage);
    }
  }
}

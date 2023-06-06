import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CrudService } from 'app/service/crud.service';
import { Router } from '@angular/router';
import { CalendrierService } from 'app/service/calendrier.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent {
  message: string;
  constructor(private router:Router ,private modal: NgbModal,public calendrierService:CalendrierService) {}
  ngAfterViewInit(): void {
    
   
   setTimeout(() => {
     this. checkNature()
     this.refresh.next()
   }, 100);
   
  }
  ngOnInit(): void {
    this.refresh.subscribe(()=>{
       setTimeout(() => {
        this.checkNature()
      }, 100);
   
    })
    setTimeout(() => {
    this.checkNature()
  }, 100);
   
  }
  checkNature()
  {
    if(this.isEtudient && (Number(localStorage.getItem("idEtu"))))
    {
      this.getAll()
    }else if(this.isAdmin  && (Number(localStorage.getItem("idEns")))){
      this. getByEnseignant()
    }else
    {
      this.router.navigate(['/']);
    }

  }
  patchEvent(data:any)
  {
    this.events=[]
    data.forEach((seanceElement:any) => {
        let seance = {
          id:seanceElement.id,
          prix:seanceElement.prixbillet,
          start: addHours(startOfDay(new Date(seanceElement.horaireDebut.slice(0,10))), Number(seanceElement.horaireDebut.slice(11,13))),
          end: addHours(new Date(seanceElement.horaireFin.slice(0,10)), Number(seanceElement.horaireFin.slice(11,13))),
          title: seanceElement.nom,
          color: colors['blue'],
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        }
        this.events.push(seance)
      });
  }
  getAll()
  {
    this.calendrierService.getAllSession().subscribe((data:any)=>{
     this.patchEvent(data);
    })
  }
  getByEnseignant()
  {
    this.calendrierService.getAllSessionCoursByEns().subscribe((data:any)=>{
     this.patchEvent(data);
    })
  }
  
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
@Input() isAdmin:boolean=false
@Input() isEtudient:boolean=false
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
     
     
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [ 
  ];

  activeDayIsOpen: boolean = true;

 
  reserver(event:any)
  {
    this.message=`<div class="alert alert-primary" role="alert">
    Veuillez patienter ...
  </div>`
    console.log(event)
    let rq:any={}
    rq.idEtudient=Number(localStorage.getItem("idEtu")) 
    rq.idCoure=event.id
    this.calendrierService.reserverFromApi(rq).subscribe((data:any)=>{
      this.refresh.next();
      this.message=`<div class="alert alert-success" role="alert">
    Réservé avec succès
  </div>`
    }, err=>{
      this.message=`<div class="alert alert-warning" role="alert">
     Erreur, Veuillez réssayer !! 
    </div>`

    })
    setTimeout(() => {
      this.message=""
     let ev= this.modalContent
     console.log(ev)
    }, 3000);
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log("iEvent")
    this.events = this.events.map((iEvent) => {
      
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
save(event:any)
{
  console.log(event)
  let rq:any={}
  rq.date=new Date(event.start)
  rq.horaireDebut=new Date(event.start)
  rq.horaireFin=new Date(event.end)
  rq.nom=event.title
  rq.id=event.id
  rq.prixbillet=event.prix
  
  this.calendrierService.miseAjourSession(rq).subscribe((data)=>{
   
     this.refresh.next()
  })
}
  addEvent(): void {
    let rq:any={}
    rq.date=new Date()
    rq.horaireDebut=new Date()
    rq.horaireFin=new Date()
    
   
    this.calendrierService.addSession(rq).subscribe((data)=>{
      this.refresh.next()
    })
   
    
     
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    if(eventToDelete.id!=undefined)
    {
      this.calendrierService.suppimerSession(eventToDelete.id).subscribe(()=>{
        this.refresh.next()
      });

     // this.events = this.events.filter((event) => event !== eventToDelete);
    }
      
     

 
    /*console.log(eventToDelete)
    this.events = this.events.filter((event) => event !== eventToDelete);*/
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}

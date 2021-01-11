import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'


export interface Event {
  title: '',
  desc: '',
  startTime: null,
  endTime: '',
  allDay: true
};


const EVENTS_KEY = 'my-events';

@Injectable({
  providedIn: 'root'
})
export class CalendarstorageService {

  constructor(private storage: Storage) { }

  //Añadir
  addEvent(event: Event): Promise<any> {
    return this.storage.get(EVENTS_KEY).then((events: Event[]) => {
      if (events) {
        events.push(event);
        return this.storage.set(EVENTS_KEY, [event]);
      } else {
        return this.storage.set(EVENTS_KEY, [event]);
      }
    });
  }

  //Leer
  getEvents(): Promise<Event[]> {
    return this.storage.get(EVENTS_KEY);
  }

  /*
  //Actualizar
  updateEvent(event: Event): Promise<any> {
    return this.storage.get(EVENTS_KEY).then((events: Event[]) => {
      if (!events || events.length === 0) {
        return null;
      }

      let newEvents: Event[] = [];

      for (let e of events) {
        if (e.id === event.id) {
          newEvents.push(event);
        } else {
          newEvents.push(e);
        }
      }

      return this.storage.set(EVENTS_KEY, newEvents);
    });
  }

  //Eliminar
  deleteEvent(id: number): Promise<Event> {
    return this.storage.get(EVENTS_KEY).then((events: Event[]) => {
      if (!events || events.length === 0) {
        return null;
      }

      let toKeep: Event[] = [];

      for (let e of events) {
        if (e.id !== id) {
          toKeep.push(e);
        }
      }

      return this.storage.set(EVENTS_KEY, toKeep);
    });

  }
  */
}

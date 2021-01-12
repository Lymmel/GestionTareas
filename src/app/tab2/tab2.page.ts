import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../cal-modal/cal-modal.page';
import { Componente } from '../interfaces/componente';
import { CalendarComponent } from 'ionic2-calendar';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  //variables para el calendario
  eventSource = [];
  viewTitle: string;

  storageKey = "keyon";




  //utilizamos la interfaz para los componentes dem menú
  componentes: Componente[] = [];

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private mCtr: MenuController, private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController, private storageSvc: StorageService) { }

  goToMenu() {
    this.mCtr.toggle();
    this.mCtr.enable(true);
  }

  /*
  nngOnInit() {
    this.storageSvc.get(this.storageKey);
  }
  */

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  
  selectedDate: Date;


  // cambiar a día/semana/mes
  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  
  // selección de fecha
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Cuando clicamos el evento del calendario
  async onEventSelected(event) {
    // conversión
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
    });
    
  }
}

   
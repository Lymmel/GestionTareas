import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarstorageService } from '../services/calendarstorage.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  viewTitle: string;


  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };

  storageKey = "keyon";

  modalReady = false;

  constructor(private modalCtrl: ModalController, private calSSv: CalendarstorageService, private storageSv: StorageService) {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }


  save() {
    this.modalCtrl.dismiss({ event: this.event });
    //this.storageSv.store(this.storageKey, this.event);
    //this.calSSv.addEvent();
  }


  onViewTitleChanged(title) {
    this.viewTitle = title;
  }


  onTimeSelected(ev) {
    this.event.startTime = new Date(ev.selectedTime);
  }


  close() {
    this.modalCtrl.dismiss();
  }


}
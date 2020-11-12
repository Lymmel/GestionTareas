import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Contrato } from '../interfaces/contratos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContratosService } from '../services/contratos.service';

@Component({
  selector: 'app-addcontratos-modal',
  templateUrl: './addcontratos-modal.page.html',
  styleUrls: ['./addcontratos-modal.page.scss'],
})
export class AddcontratosModalPage implements OnInit {

  public contractForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private contSvc: ContratosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.contractForm = this.formBuilder.group({
      ejerciciocontrato: ['', Validators.required],
      seriecontrato: [''],
      fechacontrato: [''],
      totalhorascontrato: ['']
    });
  }

  addClient() {
    let data: Contrato;
    data = {
      ejerciciocontrato: this.contractForm.get('ejerciciocontrato').value,
      seriecontrato: this.contractForm.get('seriecontrato').value,
      fechacontrato: this.contractForm.get('fechacontrato').value,
      totalhorascontrato: this.contractForm.get('totalhorascontrato').value,
    }
    this.myLoading.presentLoading();

    try {
      this.contSvc.createContract(data).subscribe((ok) => {
        this.contractForm.reset();
        this.myToast.presentToast("Contrato agregado", 'success');
      })
    } catch (error) {
      this.myToast.presentToast("Error", 'danger', 4000);
      
    } finally {
      this.myLoading.hideLoading();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

}

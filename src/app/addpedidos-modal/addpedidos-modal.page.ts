import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Pedido } from '../interfaces/pedidos';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: 'app-addpedidos-modal',
  templateUrl: './addpedidos-modal.page.html',
  styleUrls: ['./addpedidos-modal.page.scss'],
})
export class AddpedidosModalPage implements OnInit {

  public pedidoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private pedSvc: PedidosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.pedidoForm = this.formBuilder.group({
      ejerciciopedido: ['', Validators.required],
      fechapedido: [''],
      seriepedido: [''],
      totalhoraspedido: ['']
    });
  }

  addClient() {
    let data: Pedido;
    data = {
      ejerciciopedido: this.pedidoForm.get('ejerciciopedido').value,
      fechapedido: this.pedidoForm.get('fechapedido').value,
      seriepedido: this.pedidoForm.get('seriepedido').value,
      totalhoraspedido: this.pedidoForm.get('totalhoraspedido').value,
    }
    this.myLoading.presentLoading();

    try {
      this.pedSvc.createPedido(data).subscribe((ok) => {
        this.pedidoForm.reset();
        this.myToast.presentToast("Cliente agregado", 'success');
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

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'contratos',
    loadChildren: () => import('./contratos/contratos.module').then( m => m.ContratosPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  },
  {
    path: 'tareas',
    loadChildren: () => import('./tareas/tareas.module').then( m => m.TareasPageModule)
  },
  {
    path: 'partes',
    loadChildren: () => import('./partes/partes.module').then( m => m.PartesPageModule)
  },
  {
    path: 'addclient-modal',
    loadChildren: () => import('./addclient-modal/addclient-modal.module').then( m => m.AddclientModalPageModule)
  },
  {
    path: 'addcontratos-modal',
    loadChildren: () => import('./addcontratos-modal/addcontratos-modal.module').then( m => m.AddcontratosModalPageModule)
  },
  {
    path: 'addpedidos-modal',
    loadChildren: () => import('./addpedidos-modal/addpedidos-modal.module').then( m => m.AddpedidosModalPageModule)
  },
  {
    path: 'addproyectos-modal',
    loadChildren: () => import('./addproyectos-modal/addproyectos-modal.module').then( m => m.AddproyectosModalPageModule)
  },
  {
    path: 'addtareas-modal',
    loadChildren: () => import('./addtareas-modal/addtareas-modal.module').then( m => m.AddtareasModalPageModule)
  },
  {
    path: 'addpartes-modal',
    loadChildren: () => import('./addpartes-modal/addpartes-modal.module').then( m => m.AddpartesModalPageModule)
  },
  {
    path: 'clientdetails-modal',
    loadChildren: () => import('./clientdetails-modal/clientdetails-modal.module').then( m => m.ClientdetailsModalPageModule)
  },
  {
    path: 'contractdetails-modal',
    loadChildren: () => import('./contractdetails-modal/contractdetails-modal.module').then( m => m.ContractdetailsModalPageModule)
  },
  {
    path: 'pedidosdetails-modal',
    loadChildren: () => import('./pedidosdetails-modal/pedidosdetails-modal.module').then( m => m.PedidosdetailsModalPageModule)
  },
  {
    path: 'projectdetails-modal',
    loadChildren: () => import('./projectdetails-modal/projectdetails-modal.module').then( m => m.ProjectdetailsModalPageModule)
  },
  {
    path: 'tareadetails-modal',
    loadChildren: () => import('./tareadetails-modal/tareadetails-modal.module').then( m => m.TareadetailsModalPageModule)
  },
  {
    path: 'partedetails-modal',
    loadChildren: () => import('./partedetails-modal/partedetails-modal.module').then( m => m.PartedetailsModalPageModule)
  },
  {
    path: 'tarea-edit-modal',
    loadChildren: () => import('./tarea-edit-modal/tarea-edit-modal.module').then( m => m.TareaEditModalPageModule)
  },
  {
    path: 'parte-edit-modal',
    loadChildren: () => import('./parte-edit-modal/parte-edit-modal.module').then( m => m.ParteEditModalPageModule)
  },
  {
    path: 'proyecto-edit-modal',
    loadChildren: () => import('./proyecto-edit-modal/proyecto-edit-modal.module').then( m => m.ProyectoEditModalPageModule)
  },
  {
    path: 'pedido-edit-modal',
    loadChildren: () => import('./pedido-edit-modal/pedido-edit-modal.module').then( m => m.PedidoEditModalPageModule)
  },
  {
    path: 'contrato-edit-modal',
    loadChildren: () => import('./contrato-edit-modal/contrato-edit-modal.module').then( m => m.ContratoEditModalPageModule)
  },
  {
    path: 'cliente-edit-modal',
    loadChildren: () => import('./cliente-edit-modal/cliente-edit-modal.module').then( m => m.ClienteEditModalPageModule)
  },
  {
    path: 'client-notes-modal',
    loadChildren: () => import('./client-notes-modal/client-notes-modal.module').then( m => m.ClientNotesModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

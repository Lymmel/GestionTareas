import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddpedidosModalPage } from './addpedidos-modal.page';

describe('AddpedidosModalPage', () => {
  let component: AddpedidosModalPage;
  let fixture: ComponentFixture<AddpedidosModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpedidosModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddpedidosModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

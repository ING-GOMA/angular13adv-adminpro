import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonaComponent } from './dona/dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    DonaComponent,
    IncrementadorComponent,
    ModalImagenComponent
  ],
  exports:[
    DonaComponent,
    IncrementadorComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }

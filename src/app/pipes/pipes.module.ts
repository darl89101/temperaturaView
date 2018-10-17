import { NgModule } from '@angular/core';

// Pipes
import { ImagenPipe } from './imagen.pipe';
import { CapitalizadoPipe } from './capitalizado.pipe';


@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    CapitalizadoPipe
  ],
  exports: [
    ImagenPipe,
    CapitalizadoPipe
  ]
})
export class PipesModule { }

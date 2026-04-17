import { NgModule } from '@angular/core';
import { ContenteditableValueAccessor } from './directives/content-editable-form-control.directive';
import { MaterialModule } from './material/material.module';


const imports = [
  MaterialModule,
]

const declarations = [
  ContenteditableValueAccessor,
]

@NgModule({
  declarations: declarations,
  imports: imports,
  exports: [
    ...imports,
    ...declarations,
  ],
})

export class SharedModule { }

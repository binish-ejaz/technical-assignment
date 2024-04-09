import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SVGRectangleRoutingModule } from './svg-rectangle-routing.module';
import { SVGRectangleComponent } from './svg-rectangle.component';


@NgModule({
  declarations: [
    SVGRectangleComponent
  ],
  imports: [
    CommonModule,
    SVGRectangleRoutingModule
  ]
})
export class SVGRectangleModule { }

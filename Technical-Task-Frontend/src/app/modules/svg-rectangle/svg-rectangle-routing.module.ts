import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SVGRectangleComponent } from './svg-rectangle.component';

const routes: Routes = [{ path: '', component: SVGRectangleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SVGRectangleRoutingModule { }

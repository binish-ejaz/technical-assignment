import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RectangleService } from './rectangle.service';
import { Rectangle } from './rectangle.model';

@Component({
  selector: 'app-svg-rectangle',
  templateUrl: './svg-rectangle.component.html',
  styleUrls: ['./svg-rectangle.component.less'],
  providers: [RectangleService],
})
export class SVGRectangleComponent implements AfterViewInit {
  @ViewChild('svg') svgRef!: ElementRef;
  @ViewChild('resizeBox') resizeBoxRef!: ElementRef;

  mousemoveListener?: () => void;
  mouseupListener?: () => void;

  x = 10;
  y = 10;
  width = 0;
  height = 0;
  svgWidth = 1510;
  svgHeight = 610;
  resizeCursor = 'se-resize';
  isResizing = false;
  viewBox = '0 0 1510 610';
  zoomFactor = 1.1;

  constructor(
    private renderer: Renderer2,
    private _rectangleService: RectangleService
  ) {}
  ngAfterViewInit(): void {
    this._rectangleService.getRectangle().subscribe({
      next: (response) => {
        this.width = response.width;
        this.height = response.height;
      },
      error: (err) => {
        //console.log(err.message);
        window.alert(err.message);
      }
    });
  }

  onResizeStart(event: MouseEvent) {
    this.isResizing = true;
    this.renderer.setStyle(document.body, 'cursor', this.resizeCursor);
    this.mousemoveListener = this.renderer.listen(
      'document',
      'mousemove',
      (e) => this.onResizing(e)
    );
    this.mouseupListener = this.renderer.listen('document', 'mouseup', () =>
      this.onResizeEnd()
    );
  }

  onResizing(event: MouseEvent) {
    if (this.isResizing) {
      this.width = this.roundToNearest(event.clientX - this.x, 10);
      this.height = this.roundToNearest(event.clientY - this.y, 10);
    }
  }

  onResizeEnd() {
    this.isResizing = false;
    this.renderer.setStyle(document.body, 'cursor', 'default');
    this.mousemoveListener = undefined;
    this.mouseupListener = undefined;
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    const zoomAmount = event.deltaY < 0 ? 1 / this.zoomFactor : this.zoomFactor;
    const viewBoxValues = this.viewBox.split(' ').map(Number);
    viewBoxValues[2] *= zoomAmount;
    viewBoxValues[3] *= zoomAmount;
    this.viewBox = `${viewBoxValues[0]} ${viewBoxValues[1]} ${viewBoxValues[2]} ${viewBoxValues[3]}`;
  }

  roundToNearest(value: number, step: number): number {
    return Math.round(value / step) * step;
  }

  updateRectangle(){
    let rect: Rectangle = {
      width: this.width,
      height: this.height,
    };
    this._rectangleService.updateRectangle(rect).subscribe({
      next: () => {
        window.alert('Rectangle Updated Successfully!')
      },
      error: (err) => window.alert(err.message)

    });
  }
}

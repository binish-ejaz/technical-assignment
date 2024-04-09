import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SVGRectangleComponent } from './svg-rectangle.component';

describe('DrawRectangleComponent', () => {
  let component: SVGRectangleComponent;
  let fixture: ComponentFixture<SVGRectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SVGRectangleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SVGRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

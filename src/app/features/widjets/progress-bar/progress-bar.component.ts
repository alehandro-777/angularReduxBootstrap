import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: '[app-progress-bar]',
  templateUrl: './progress-bar.component.svg',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() x = 0;
  @Input() y = 0;
  @Input() w = 500;
  @Input() h = 20;
  @Input() fillColor = 'rgb(125, 255, 128)';

  scaledValue = 0;

  constructor() { 

  }

  ngOnInit(): void {

  }

  //emit 0 after 1 second then complete, since no second argument is supplied
  source = timer(1000, 2000);
  //simulate expertan data
  subscribe = this.source.subscribe(val => this.onClick() );

  onClick():void {

    this.value = Math.floor(Math.random() * 100);
    this.linearRightXScaling();
  }

  //x- zero scale, x + width -full scale
  linearRightXScaling(): void {
    this.scaledValue = this.linearScale(this.value, this.min, this.max, 0, this.w)
  }

  linearBottomYScaling(): void {
    this.scaledValue = this.linearScale(this.value, this.min, this.max, 0, this.h)
  }  

  linearScale(value:number, min:number, max:number, zero:number, full:number): number {
    return zero + (value-min)*(full-zero)/(max-min);
  }
}

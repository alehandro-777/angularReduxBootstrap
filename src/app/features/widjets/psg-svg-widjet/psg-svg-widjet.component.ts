import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-psg-svg-widjet]',
  templateUrl: './psg-svg-widjet.component.svg',
  styleUrls: ['./psg-svg-widjet.component.scss']
})
export class PsgSvgWidjetComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
    
  @Input() x = 100;
  @Input() y = 100;
  @Input() w = 120;
  @Input() h = 30;
  @Input() min = 0;
  @Input() max = 100;

  @Input() fillColor = 'rgb(255, 255, 255)';
  @Input() progressColor = 'rgb(125, 255, 128)';

  @Input() eu = "тис.м3";
  value = "---";
  delta = "---";
  fillDelta = "green";
  scaledValue = 0;
  percentValue =0;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}`)

      if (values && values.length > 1) {
        this.value = values[0].value.toFixed(3);
        let delta = values[0].value - values[1].value;
        this.fillDelta = delta < 0 ? "red" : "green";
        this.delta = delta < 0 ? delta.toFixed(3) : "+"+ delta.toFixed(3);
        this.scaledValue = this.linearRightXScaling(values[0].value);
        this.percentValue = Math.floor( values[0].value*100 / this.max);      
      }
      else {
        this.value = "---";
        this.delta = "---";
        this.scaledValue = 0; 
        this.percentValue = 0; 
      }
    }
  }


  ngOnInit(): void {

  }
  
  onClick() {

  }
  //x- zero scale, x + width -full scale
  linearRightXScaling(value:number): number {
    return this.linearScale(value, this.min, this.max, 0, this.w)
  }

  linearBottomYScaling(value:number): number {
    return this.linearScale(value, this.min, this.max, 0, this.h)
  }  

  linearScale(value:number, min:number, max:number, zero:number, full:number): number {
    return zero + (value-min)*(full-zero)/(max-min);
  }

}

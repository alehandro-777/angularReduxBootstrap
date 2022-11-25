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

  @Input() fixed = 3;  
  @Input() k = 0.001;

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

        let currVal = values[0].value *this.k;
        let prevVal = values[1].value *this.k;

        this.value = currVal.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
        let dv = currVal - prevVal;
        this.fillDelta = dv < 0 ? "red" : "green";
        let sdv = dv.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
        this.delta = dv < 0 ? sdv : "+"+sdv;

        this.scaledValue = this.linearRightXScaling(currVal);
        this.percentValue = Math.floor( currVal*100 / this.max);

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

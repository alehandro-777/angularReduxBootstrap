import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from 'src/app/features/dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-table-sub-cell]',
  templateUrl: './table-sub-cell.component.html',
  styleUrls: ['./table-sub-cell.component.scss']
})

  export class TableSubCellComponent implements OnInit, OnChanges {
    @Input() key1 = "";
    @Input() key2 = "";
    @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
    @Input() offset = 0;
    @Input() fixed = 3;  
    @Input() k = 1;  
  
    value = "---";
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes["data"] && this.data ) {
        let values1 = this.data.get(`${this.key1}`);
        let values2 = this.data.get(`${this.key2}`);

        if (values1 && values1.length > this.offset && values2 && values2.length > this.offset) {
          let result = this.k * (values1[this.offset].value - values2[this.offset].value);
          this.value = result.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed}); //     
        }
        else {
          this.value = "---"; 
        }
      }
    }
  
  }
  
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Value } from 'src/app/features/dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-table-cell]',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {
  @Input() key = "";
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
      let values = this.data.get(`${this.key}`)

      if (values && values.length > this.offset) {
        let result = this.k * values[this.offset].value;
        this.value = result.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed}) //     
      }
      else {
        this.value = "---"; 
      }
    }
  }

}

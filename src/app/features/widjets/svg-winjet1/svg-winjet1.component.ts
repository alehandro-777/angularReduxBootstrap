import { Component, Input, OnInit } from '@angular/core';
// RxJS v6+
import { timer } from 'rxjs';

@Component({
  selector: '[app-svg-winjet1]',
  templateUrl: './svg-winjet1.component.svg',
  styleUrls: ['./svg-winjet1.component.scss']
})
export class SvgWinjet1Component implements OnInit {

  @Input() x = 100;
  @Input() y = 100;
  @Input() value = "----";

  //emit 0 after 1 second then complete, since no second argument is supplied
  source = timer(1000, 2000);
  //simulate expertan data
  subscribe = this.source.subscribe(val => this.onClick() );

  constructor() { }

  ngOnInit(): void {
  }
  fillColor = 'rgb(255, 255, 255)';

  onClick() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    this.fillColor = `rgb(${r}, ${g}, ${b})`;
    
    this.value = (Math.random() * 10000).toFixed(3);
  }

}

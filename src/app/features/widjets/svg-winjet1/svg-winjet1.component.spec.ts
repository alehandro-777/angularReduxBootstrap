import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgWinjet1Component } from './svg-winjet1.component';

describe('SvgWinjet1Component', () => {
  let component: SvgWinjet1Component;
  let fixture: ComponentFixture<SvgWinjet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgWinjet1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgWinjet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

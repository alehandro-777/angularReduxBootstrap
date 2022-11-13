import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCart1Component } from './bar-cart1.component';

describe('BarCart1Component', () => {
  let component: BarCart1Component;
  let fixture: ComponentFixture<BarCart1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarCart1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarCart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

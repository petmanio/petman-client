import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSliderComponent } from './mz-slider.component';

describe('MzSliderComponent', () => {
  let component: MzSliderComponent;
  let fixture: ComponentFixture<MzSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

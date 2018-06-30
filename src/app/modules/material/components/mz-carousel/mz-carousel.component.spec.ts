import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCarouselComponent } from './mz-carousel.component';

describe('MzCarouselComponent', () => {
  let component: MzCarouselComponent;
  let fixture: ComponentFixture<MzCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

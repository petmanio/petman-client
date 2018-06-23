import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuuriComponent } from './muuri.component';

describe('MuuriComponent', () => {
  let component: MuuriComponent;
  let fixture: ComponentFixture<MuuriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MuuriComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuuriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

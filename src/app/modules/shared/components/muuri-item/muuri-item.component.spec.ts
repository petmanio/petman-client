import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuuriItemComponent } from './muuri-item.component';

describe('MuuriItemComponent', () => {
  let component: MuuriItemComponent;
  let fixture: ComponentFixture<MuuriItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MuuriItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuuriItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

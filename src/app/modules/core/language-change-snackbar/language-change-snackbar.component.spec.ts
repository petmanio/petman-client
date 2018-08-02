import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageChangeSnackbarComponent } from './language-change-snackbar.component';

describe('LanguageChangeSnackbarComponent', () => {
  let component: LanguageChangeSnackbarComponent;
  let fixture: ComponentFixture<LanguageChangeSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageChangeSnackbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageChangeSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

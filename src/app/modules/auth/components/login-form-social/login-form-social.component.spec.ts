import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormSocialComponent } from './login-form-social.component';

describe('LoginFormSocialComponent', () => {
  let component: LoginFormSocialComponent;
  let fixture: ComponentFixture<LoginFormSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormSocialComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginScrComponent } from './login-scr.component';

describe('LoginScrComponent', () => {
  let component: LoginScrComponent;
  let fixture: ComponentFixture<LoginScrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginScrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

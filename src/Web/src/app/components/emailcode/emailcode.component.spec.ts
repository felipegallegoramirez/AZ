import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailcodeComponent } from './emailcode.component';

describe('EmailcodeComponent', () => {
  let component: EmailcodeComponent;
  let fixture: ComponentFixture<EmailcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

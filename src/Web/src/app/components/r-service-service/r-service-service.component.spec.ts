import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RServiceServiceComponent } from './r-service-service.component';

describe('RServiceServiceComponent', () => {
  let component: RServiceServiceComponent;
  let fixture: ComponentFixture<RServiceServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RServiceServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RServiceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

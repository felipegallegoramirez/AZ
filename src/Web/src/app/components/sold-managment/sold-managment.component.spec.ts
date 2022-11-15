import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldManagmentComponent } from './sold-managment.component';

describe('SoldManagmentComponent', () => {
  let component: SoldManagmentComponent;
  let fixture: ComponentFixture<SoldManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

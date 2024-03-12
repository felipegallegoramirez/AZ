import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorhistoryManagmentComponent } from './distributorhistory-managment.component';

describe('DistributorhistoryManagmentComponent', () => {
  let component: DistributorhistoryManagmentComponent;
  let fixture: ComponentFixture<DistributorhistoryManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorhistoryManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorhistoryManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

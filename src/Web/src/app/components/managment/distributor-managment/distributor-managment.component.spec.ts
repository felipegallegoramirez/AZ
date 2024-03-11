import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorManagmentComponent } from './distributor-managment.component';

describe('DistributorManagmentComponent', () => {
  let component: DistributorManagmentComponent;
  let fixture: ComponentFixture<DistributorManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

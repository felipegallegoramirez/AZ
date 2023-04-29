import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryeManagmentComponent } from './inventorye-managment.component';

describe('InventoryeManagmentComponent', () => {
  let component: InventoryeManagmentComponent;
  let fixture: ComponentFixture<InventoryeManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryeManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryeManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

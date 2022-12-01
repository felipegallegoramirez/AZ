import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTillComponent } from './inventory-till.component';

describe('InventoryTillComponent', () => {
  let component: InventoryTillComponent;
  let fixture: ComponentFixture<InventoryTillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

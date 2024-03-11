import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleShopManagmentComponent } from './simple-shop-managment.component';

describe('SimpleShopManagmentComponent', () => {
  let component: SimpleShopManagmentComponent;
  let fixture: ComponentFixture<SimpleShopManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleShopManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleShopManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

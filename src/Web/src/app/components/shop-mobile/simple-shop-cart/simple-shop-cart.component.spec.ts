import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleShopCartComponent } from './simple-shop-cart.component';

describe('SimpleShopCartComponent', () => {
  let component: SimpleShopCartComponent;
  let fixture: ComponentFixture<SimpleShopCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleShopCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleShopCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

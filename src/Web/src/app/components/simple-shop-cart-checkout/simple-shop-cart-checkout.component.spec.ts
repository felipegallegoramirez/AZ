import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleShopCartCheckoutComponent } from './simple-shop-cart-checkout.component';

describe('SimpleShopCartCheckoutComponent', () => {
  let component: SimpleShopCartCheckoutComponent;
  let fixture: ComponentFixture<SimpleShopCartCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleShopCartCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleShopCartCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

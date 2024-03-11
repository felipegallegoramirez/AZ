import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleShopMainComponent } from './simple-shop-main.component';

describe('SimpleShopMainComponent', () => {
  let component: SimpleShopMainComponent;
  let fixture: ComponentFixture<SimpleShopMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleShopMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleShopMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorHistoryComponent } from './distributor-history.component';

describe('DistributorHistoryComponent', () => {
  let component: DistributorHistoryComponent;
  let fixture: ComponentFixture<DistributorHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

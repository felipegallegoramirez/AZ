import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RServiceWorkspaceComponent } from './r-service-workspace.component';

describe('RServiceWorkspaceComponent', () => {
  let component: RServiceWorkspaceComponent;
  let fixture: ComponentFixture<RServiceWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RServiceWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RServiceWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

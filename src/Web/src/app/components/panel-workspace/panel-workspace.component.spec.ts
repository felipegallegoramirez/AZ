import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelWorkspaceComponent } from './panel-workspace.component';

describe('PanelWorkspaceComponent', () => {
  let component: PanelWorkspaceComponent;
  let fixture: ComponentFixture<PanelWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

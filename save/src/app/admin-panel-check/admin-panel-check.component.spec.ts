import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelCheckComponent } from './admin-panel-check.component';

describe('AdminPanelCheckComponent', () => {
  let component: AdminPanelCheckComponent;
  let fixture: ComponentFixture<AdminPanelCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPanelCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPanelCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

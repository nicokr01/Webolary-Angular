import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSmallLightComponent } from './sidebar-small-light.component';

describe('SidebarSmallLightComponent', () => {
  let component: SidebarSmallLightComponent;
  let fixture: ComponentFixture<SidebarSmallLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSmallLightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarSmallLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersettingsCheckComponent } from './usersettings-check.component';

describe('UsersettingsCheckComponent', () => {
  let component: UsersettingsCheckComponent;
  let fixture: ComponentFixture<UsersettingsCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersettingsCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersettingsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

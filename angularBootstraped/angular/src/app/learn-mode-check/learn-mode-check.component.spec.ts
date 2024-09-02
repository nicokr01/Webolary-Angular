import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnModeCheckComponent } from './learn-mode-check.component';

describe('LearnModeCheckComponent', () => {
  let component: LearnModeCheckComponent;
  let fixture: ComponentFixture<LearnModeCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnModeCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnModeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

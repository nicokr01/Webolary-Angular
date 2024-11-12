import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnModeComponent } from './learn-mode.component';

describe('LearnModeComponent', () => {
  let component: LearnModeComponent;
  let fixture: ComponentFixture<LearnModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

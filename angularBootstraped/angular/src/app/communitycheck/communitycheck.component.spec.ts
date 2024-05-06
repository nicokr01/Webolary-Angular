import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitycheckComponent } from './communitycheck.component';

describe('CommunitycheckComponent', () => {
  let component: CommunitycheckComponent;
  let fixture: ComponentFixture<CommunitycheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunitycheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunitycheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

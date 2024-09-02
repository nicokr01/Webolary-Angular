import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNetowrkAuthComponent } from './content-netowrk-auth.component';

describe('ContentNetowrkAuthComponent', () => {
  let component: ContentNetowrkAuthComponent;
  let fixture: ComponentFixture<ContentNetowrkAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentNetowrkAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentNetowrkAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

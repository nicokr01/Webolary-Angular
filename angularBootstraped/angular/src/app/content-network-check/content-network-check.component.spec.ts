import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNetworkCheckComponent } from './content-network-check.component';

describe('ContentNetworkCheckComponent', () => {
  let component: ContentNetworkCheckComponent;
  let fixture: ComponentFixture<ContentNetworkCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentNetworkCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentNetworkCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

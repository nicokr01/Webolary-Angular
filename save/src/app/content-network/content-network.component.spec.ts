import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNetworkComponent } from './content-network.component';

describe('ContentNetworkComponent', () => {
  let component: ContentNetworkComponent;
  let fixture: ComponentFixture<ContentNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentNetworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

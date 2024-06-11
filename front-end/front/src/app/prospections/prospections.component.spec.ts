import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectionsComponent } from './prospections.component';

describe('ProspectionsComponent', () => {
  let component: ProspectionsComponent;
  let fixture: ComponentFixture<ProspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

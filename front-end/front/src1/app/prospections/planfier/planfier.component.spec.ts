import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanfierComponent } from './planfier.component';

describe('PlanfierComponent', () => {
  let component: PlanfierComponent;
  let fixture: ComponentFixture<PlanfierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanfierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanfierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

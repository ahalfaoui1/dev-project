import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisedetailsComponent } from './entreprisedetails.component';

describe('EntreprisedetailsComponent', () => {
  let component: EntreprisedetailsComponent;
  let fixture: ComponentFixture<EntreprisedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntreprisedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntreprisedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

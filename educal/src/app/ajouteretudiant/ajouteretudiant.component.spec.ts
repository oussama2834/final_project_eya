import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteretudiantComponent } from './ajouteretudiant.component';

describe('AjouteretudiantComponent', () => {
  let component: AjouteretudiantComponent;
  let fixture: ComponentFixture<AjouteretudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteretudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteretudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

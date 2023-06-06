import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSeanceComponent } from './ajouter-seance.component';

describe('AjouterSeanceComponent', () => {
  let component: AjouterSeanceComponent;
  let fixture: ComponentFixture<AjouterSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterSeanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

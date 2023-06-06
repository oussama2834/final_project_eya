import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsenseignantComponent } from './reservationsenseignant.component';

describe('ReservationsenseignantComponent', () => {
  let component: ReservationsenseignantComponent;
  let fixture: ComponentFixture<ReservationsenseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsenseignantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsenseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

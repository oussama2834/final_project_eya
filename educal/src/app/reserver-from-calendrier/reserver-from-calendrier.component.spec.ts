import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverFromCalendrierComponent } from './reserver-from-calendrier.component';

describe('ReserverFromCalendrierComponent', () => {
  let component: ReserverFromCalendrierComponent;
  let fixture: ComponentFixture<ReserverFromCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserverFromCalendrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserverFromCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

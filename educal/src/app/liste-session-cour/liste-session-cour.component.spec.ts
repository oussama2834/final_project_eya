import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSessionCourComponent } from './liste-session-cour.component';

describe('ListeSessionCourComponent', () => {
  let component: ListeSessionCourComponent;
  let fixture: ComponentFixture<ListeSessionCourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeSessionCourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSessionCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

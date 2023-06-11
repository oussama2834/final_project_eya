import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceformationComponent } from './seanceformation.component';

describe('SeanceformationComponent', () => {
  let component: SeanceformationComponent;
  let fixture: ComponentFixture<SeanceformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeanceformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeanceformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

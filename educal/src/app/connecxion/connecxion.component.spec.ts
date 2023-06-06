import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnecxionComponent } from './connecxion.component';

describe('ConnecxionComponent', () => {
  let component: ConnecxionComponent;
  let fixture: ComponentFixture<ConnecxionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnecxionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnecxionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

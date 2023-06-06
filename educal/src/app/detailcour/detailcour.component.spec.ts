import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcourComponent } from './detailcour.component';

describe('DetailcourComponent', () => {
  let component: DetailcourComponent;
  let fixture: ComponentFixture<DetailcourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailcourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

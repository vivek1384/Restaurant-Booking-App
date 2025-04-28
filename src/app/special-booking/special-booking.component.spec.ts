import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialBookingComponent } from './special-booking.component';

describe('SpecialBookingComponent', () => {
  let component: SpecialBookingComponent;
  let fixture: ComponentFixture<SpecialBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

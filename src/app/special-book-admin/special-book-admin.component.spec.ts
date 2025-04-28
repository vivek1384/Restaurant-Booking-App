import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialBookAdminComponent } from './special-book-admin.component';

describe('SpecialBookAdminComponent', () => {
  let component: SpecialBookAdminComponent;
  let fixture: ComponentFixture<SpecialBookAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialBookAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialBookAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

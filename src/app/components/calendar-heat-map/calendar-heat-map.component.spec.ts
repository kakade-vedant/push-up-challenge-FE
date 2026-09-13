import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHeatMapComponent } from './calendar-heat-map.component';

describe('CalendarHeatMapComponent', () => {
  let component: CalendarHeatMapComponent;
  let fixture: ComponentFixture<CalendarHeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarHeatMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

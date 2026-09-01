import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSetComponent } from './log-set.component';

describe('LogSetComponent', () => {
  let component: LogSetComponent;
  let fixture: ComponentFixture<LogSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

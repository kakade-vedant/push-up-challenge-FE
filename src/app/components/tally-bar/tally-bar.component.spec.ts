import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyBarComponent } from './tally-bar.component';

describe('TallyBarComponent', () => {
  let component: TallyBarComponent;
  let fixture: ComponentFixture<TallyBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TallyBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

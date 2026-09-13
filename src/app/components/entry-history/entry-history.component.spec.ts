import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryHistoryComponent } from './entry-history.component';

describe('EntryHistoryComponent', () => {
  let component: EntryHistoryComponent;
  let fixture: ComponentFixture<EntryHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

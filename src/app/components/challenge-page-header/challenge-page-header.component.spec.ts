import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengePageHeaderComponent } from './challenge-page-header.component';

describe('ChallengePageHeaderComponent', () => {
  let component: ChallengePageHeaderComponent;
  let fixture: ComponentFixture<ChallengePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengePageHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

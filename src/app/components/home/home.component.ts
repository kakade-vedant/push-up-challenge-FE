import { Component, signal } from '@angular/core';
import { LogSetComponent } from '../log-set/log-set.component';
import {
  ChallengeStatModel,
  ChallengeStatsComponent,
} from '../challenge-stats/challenge-stats.component';
import { EntryService } from '../../service/entry.service';
import { TallyBarComponent } from '../tally-bar/tally-bar.component';
import { GetAllEntriesLog } from '../../model/push-up.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChallengeHeroComponent } from '../challenge-hero/challenge-hero.component';
import { ChallengePageHeaderComponent } from '../challenge-page-header/challenge-page-header.component';
import { CalendarHeatmapComponent } from '../calendar-heat-map/calendar-heat-map.component';
import { EntryHistoryComponent } from '../entry-history/entry-history.component';

@Component({
  selector: 'app-home',
  imports: [
    LogSetComponent,
    ChallengeStatsComponent,
    TallyBarComponent,
    ChallengeHeroComponent,
    ChallengePageHeaderComponent,
    CalendarHeatmapComponent,
    EntryHistoryComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  challengeData = signal<GetAllEntriesLog | undefined>(undefined);
  challengeStatData = signal<ChallengeStatModel | undefined>(undefined);

  constructor(protected entryService: EntryService) {
    this.entryService
      .data$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (!data) return; // initial null value before the first load resolves
        
        this.challengeData.set(data);

        this.challengeStatData.set({
          needPerDay: data.needPerDay,
          challengeDayNumber: data.challengeDayNumber,
          totalNumberOfDays: data.totalNumberOfDays,
          streak: data.streak,
          todayTotalRep: data.todayTotalRep,
          currentAverage: data.currentAverage,
          projectedTotal: data.projectedTotal,
        });
      });
  }

  deleteEntry(entryId: string) {
    this.entryService.deleteEntry(entryId);
  }
}

import { Component, input } from '@angular/core';

export interface ChallengeStatModel {
  challengeDayNumber: number;
  totalNumberOfDays: number;
  todayTotalRep: number;
  streak: number;
  needPerDay: number;
  currentAverage: number;
  projectedTotal: number;
}

@Component({
  selector: 'app-challenge-stats',
  imports: [],
  templateUrl: './challenge-stats.component.html',
  styleUrl: './challenge-stats.component.scss'
})
export class ChallengeStatsComponent {
  challengeStatData = input.required<ChallengeStatModel>();
}

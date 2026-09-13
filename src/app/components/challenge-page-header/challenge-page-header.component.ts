import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-challenge-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-page-header.component.html',
  styleUrls: ['./challenge-page-header.component.scss'],
})
export class ChallengePageHeaderComponent {
  eyebrowLabel = input<string>('10,000 Push-Up Challenge');
  dateRange = input<string>('Sep 1 - Dec 31, 2026');
  title = input<string>('');
  badge = input<string | undefined>(undefined); // e.g. "Live progress · view only"
}
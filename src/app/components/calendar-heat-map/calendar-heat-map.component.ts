import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEntryLog } from '../../model/push-up.model';

interface DayCell {
  date: string;
  label: string;
  count: number;
  lvl: 0 | 1 | 2 | 3;
  isFuture: boolean;
}

interface MonthBlock {
  name: string;
  days: DayCell[];
}

@Component({
  selector: 'app-calendar-heatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-heat-map.component.html',
  styleUrls: ['./calendar-heat-map.component.scss'],
})
export class CalendarHeatmapComponent {
  entryLogList = input<GetEntryLog[]>([]);
  startDate = input<Date>(new Date(2026, 8, 1));
  endDate = input<Date>(new Date(2026, 11, 31));

  private countByDate = computed<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const e of this.entryLogList()) {
      const ds = this.fmt(new Date(e.date));
      map[ds] = (map[ds] || 0) + e.count;
    }
    return map;
  });

  months = computed<MonthBlock[]>(() => {
    const start = this.startDate();
    const end = this.endDate();
    const today = new Date();
    const countMap = this.countByDate();

    const blocks: MonthBlock[] = [];
    let cursor = new Date(start.getFullYear(), start.getMonth(), 1);

    while (cursor <= end) {
      const year = cursor.getFullYear();
      const month = cursor.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days: DayCell[] = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(year, month, day);
        if (d < start || d > end) continue;

        const ds = this.fmt(d);
        const count = countMap[ds] || 0;
        days.push({
          date: ds,
          label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count,
          lvl: this.levelFor(count),
          isFuture: d > today,
        });
      }

      if (days.length) {
        blocks.push({
          name: cursor.toLocaleDateString('en-US', { month: 'long' }),
          days,
        });
      }
      cursor = new Date(year, month + 1, 1);
    }

    return blocks;
  });

  private levelFor(count: number): 0 | 1 | 2 | 3 {
    if (count >= 100) return 3;
    if (count >= 50) return 2;
    if (count > 0) return 1;
    return 0;
  }

  private fmt(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
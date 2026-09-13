import { Component, input, output, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEntryLog } from '../../model/push-up.model';
import { EntryService } from '../../service/entry.service';

interface EntryRow {
  id: string;
  count: number;
}

interface DateGroup {
  dateKey: string; // 'YYYY-MM-DD', used for sorting
  dateLabel: string; // 'Sep 10', for display
  total: number; // sum of all entries that day
  entries: EntryRow[];
}

@Component({
  selector: 'app-entry-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-history.component.html',
  styleUrls: ['./entry-history.component.scss'],
})
export class EntryHistoryComponent {
  entryLogList = input<GetEntryLog[]>([]);

  deleteEntry = output<string>(); // emits a single entry id

  constructor(protected entryService: EntryService) {}

  groups = computed<DateGroup[]>(() => {
    const byDate = new Map<string, DateGroup>();

    for (const entry of this.entryLogList()) {
      const d = new Date(entry.date);
      const dateKey = this.toKey(d);

      let group = byDate.get(dateKey);
      if (!group) {
        group = {
          dateKey,
          dateLabel: d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          total: 0,
          entries: [],
        };
        byDate.set(dateKey, group);
      }
      group.total += entry.count;
      group.entries.push({ id: entry.id, count: entry.count });
      group.entries.reverse(); // most recent first
    }

    return [...byDate.values()].sort((a, b) =>
      b.dateKey.localeCompare(a.dateKey),
    );
  });

  onDelete(entry: EntryRow, group: DateGroup): void {
    if (
      confirm(`Delete this ${entry.count}-rep entry from ${group.dateLabel}?`)
    ) {
      this.deleteEntry.emit(entry.id);
    }
  }

  private toKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}

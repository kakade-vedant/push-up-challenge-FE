import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tick {
  filled: boolean;
  opacity: number;
}

interface TickGroup {
  ticks: Tick[];
  slash: Tick;
}

@Component({
  selector: 'app-tally-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tally-bar.component.html',
  styleUrls: ['./tally-bar.component.scss'],
})
export class TallyBarComponent {
  total = input<number>(0);
  goal = input<number>(10000);
  tickValue = input<number>(200);

  groups = computed<TickGroup[]>(() => {
    const total = this.total();
    const goal = this.goal();
    const tickValue = this.tickValue();

    const totalTicks = Math.ceil(goal / tickValue); // 50
    const fullTicks = Math.min(totalTicks, Math.floor(total / tickValue));
    const partial = (total % tickValue) / tickValue;

    const result: TickGroup[] = [];
    for (let g = 0; g < totalTicks / 5; g++) {
      const ticks: Tick[] = [];
      for (let i = 0; i < 4; i++) {
        const idx = g * 5 + i;
        ticks.push(this.tickState(idx, fullTicks, partial));
      }
      const slashIdx = g * 5 + 4;
      result.push({ ticks, slash: this.tickState(slashIdx, fullTicks, partial) });
    }
    return result;
  });

  private tickState(idx: number, fullTicks: number, partial: number): Tick {
    if (idx < fullTicks) return { filled: true, opacity: 1 };
    if (idx === fullTicks && partial > 0) return { filled: true, opacity: 0.35 + partial * 0.5 };
    return { filled: false, opacity: 1 };
  }
}
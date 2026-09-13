import { Component, effect } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryService } from '../../service/entry.service';

@Component({
  selector: 'app-log-set',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './log-set.component.html',
  styleUrl: './log-set.component.scss',
})
export class LogSetComponent {
  todayDate: Date = new Date();

  datePickerFormControl: FormControl;
  countFormControl: FormControl;

  constructor(protected entryService: EntryService) {
    effect(() => {
      if (this.entryService.isOffline()) {
        this.datePickerFormControl.disable();
        this.countFormControl.disable();
      } else {
        this.datePickerFormControl.enable();
        this.countFormControl.enable();
      }
    });

    this.datePickerFormControl = new FormControl({
      value: this.formatDate(this.todayDate),
      disabled: false,
    });

    this.countFormControl = new FormControl({
      value: null,
      disabled: false,
    });
  }

  public addReps(count: number | null = null, date: Date | null = null): void {
    this.entryService.createEntry({
      count: count ?? this.countFormControl.value,
      date: date ?? this.datePickerFormControl.value,
    });
  }

  public formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  public quickAddCount(count: number): void {
    this.addReps(count, this.todayDate);
  }
}

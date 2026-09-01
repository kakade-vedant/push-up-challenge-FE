import { Component } from '@angular/core';
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
  constructor(private entryService: EntryService) {
    this.datePickerFormControl = new FormControl({
      value: this.formatDate(this.todayDate),
      disabled: false,

    });
  }

  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  public quickAddCount(count: number): void {
    this.entryService.createEntry({count, date: this.todayDate});
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AddNewEntry, DeleteEntry, GetAllEntriesLog } from '../model/push-up.model';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { URL } from '../constant/url';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private readonly CACHE_KEY = 'pushup10k:cache';
  isOffline = signal(true);

  private pushUpData$ = new BehaviorSubject<GetAllEntriesLog | null>(null);
  readonly data$ = this.pushUpData$.asObservable();

  constructor(private http: HttpClient) {
    this.reload();
  }

  reload(): void {
    this.http.get<GetAllEntriesLog>(URL.GET_ALL_ENTRIES_LOG).pipe(
      tap((data) => {
        this.isOffline.set(false);
        this.saveToCache(data);
      }),
      catchError((err) => {
        const cached = this.readFromCache();
        if (cached) {
          console.warn('Backend unavailable — showing cached data', err);
          this.isOffline.set(true);
          return of(cached);
        }
        console.error('Backend unavailable and no cache exists', err);
        return throwError(() => err);
      })
    ).subscribe((data) => this.pushUpData$.next(data));
  }

  createEntry(entry: AddNewEntry): void {
    if (this.isOffline()) {
      console.warn('Cannot add entries while offline.');
      return;
    }
    this.http.post<any>(URL.ADD_ENTRY_LOG, entry).subscribe(() => this.reload());
  }

  deleteEntry(entryId: string): void {
    if (this.isOffline()) {
      console.warn('Cannot delete entries while offline.');
      return;
    }
    const deleteEntryBody = { id: entryId } as DeleteEntry;
    this.http
      .delete<any>(URL.DELETE_ENTRY_LOG, { body: deleteEntryBody })
      .subscribe(() => this.reload());
  }

  private saveToCache(data: GetAllEntriesLog): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not write cache', e);
    }
  }

  private readFromCache(): GetAllEntriesLog | null {
    try {
      const raw = localStorage.getItem(this.CACHE_KEY);
      return raw ? (JSON.parse(raw) as GetAllEntriesLog) : null;
    } catch (e) {
      return null;
    }
  }
}
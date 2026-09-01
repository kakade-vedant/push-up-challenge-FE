import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddNewEntry, GetAllEntriesLog } from '../model/push-up.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL } from '../constant/url';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private pushUpData$: BehaviorSubject<GetAllEntriesLog> = new BehaviorSubject<GetAllEntriesLog>({} as GetAllEntriesLog);

  constructor(private http: HttpClient) { 

  }

  reload() {
    this.http.get<GetAllEntriesLog>(URL.GET_ALL_ENTRIES_LOG).subscribe(data => this.pushUpData$.next(data));
  }

  pushUpData():Observable<GetAllEntriesLog> {
    return this.pushUpData$.asObservable();
  }

  createEntry(entry: AddNewEntry) { 
    this.http.post<any>(URL.ADD_ENTRY_LOG, entry).subscribe(data => this.reload());
  }
}

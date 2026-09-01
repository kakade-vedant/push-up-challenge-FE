export interface GetEntryLog {
    id: string;
    date: Date;
    count: number;
}

export interface GetAllEntriesLog{
    totalRep: number;
    streak: number;
    todayTotalRep: number;
    needPerDay: number;
    entryLogList: GetEntryLog[];
}

export interface AddNewEntry {
    date?: Date;
    count: number;
}
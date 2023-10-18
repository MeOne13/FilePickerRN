import uuid from 'react-native-uuid';
import {EntryKind, JournalEntry, User} from "./Items";
import {JournalRow} from "./Rows";

export default class JournalVM {
    guid: string = uuid.v4().toString();
    color: string = 'blue';
    finished: boolean = true;
    title: string
    description: string
    startDate: Date;
    endDate: Date;
    countries: string[] = [];
    participants: User[] = [];
    author: User | undefined;
    tags: string[] = [];
    powKind: POWKind = POWKind.Guest;
    entries: JournalEntry[] = [];
    rows: JournalRow[] = [];
    summary: Summary = new Summary();

    constructor(title: string = 'Test', description: string = '...', startDate: Date | undefined, endDate: Date | undefined, entries: JournalEntry[] | undefined) {
        this.title = title;
        this.description = description;
        if (startDate === undefined) {
            const utcSeconds = Date.now();
            startDate = new Date(0);
            startDate.setUTCSeconds(utcSeconds - 432700);
        }
        if (endDate === undefined) {
            const utcSeconds = Date.now();
            endDate = new Date(0);
            endDate.setUTCSeconds(utcSeconds);
        }
        this.startDate = startDate;
        this.endDate = endDate;

        this.summary = ComposeSummary(entries, startDate, endDate);
    }
}

function ComposeSummary(entries: JournalEntry[] | undefined, startDate: Date | undefined, endDate: Date | undefined): Summary {
    const summary = new Summary();
    summary.imagesCount = entries?.filter(e => e.kind === EntryKind.Image).length ?? 0;
    summary.videosCount = entries?.filter(e => e.kind === EntryKind.Video).length ?? 0;
    if (startDate !== undefined && endDate !== undefined) {
        const diffInTime: number = startDate.getTime() - endDate.getTime();
        summary.days = diffInTime / (1000 * 3600 * 24);
    }
    summary.distanceKM = 666;
    return summary;
}

export enum POWKind {
    Owner,
    Participant,
    Guest
}

export class Summary {
    days: number = 0;
    distanceKM: number = 0;
    imagesCount: number = 0;
    videosCount: number = 0;
}
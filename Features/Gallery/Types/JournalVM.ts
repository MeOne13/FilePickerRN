import uuid from 'react-native-uuid';
import {EntryKind, JournalEntry} from "./Items";
import {JournalRow} from "./Rows";
import {GetAuthor, User} from "../Utils/Generators/TestUsers";
import {ComposeFromGround} from "../Utils/RowCompositor";

export default class JournalVM {
    get rows(): JournalRow[] {
        return this._rows;
    }
    get entries(): JournalEntry[] {
        return this._entries;
    }

    set entries(value: JournalEntry[]) {
        this._entries = value;
        this.summary = this.composeSummary(value);
        this._rows = ComposeFromGround(this.entries);
    }

    guid: string = uuid.v4().toString();
    color: string = 'blue';
    finished: boolean;
    title: string
    description: string
    startDate: Date;
    endDate: Date;
    countries: string[] = [];
    participants: User[] = [];
    author: User;
    tags: string[] = [];
    powKind: POWKind = POWKind.Guest;
    private _entries: JournalEntry[] = [];
    private _rows: JournalRow[] = [];
    summary: Summary = new Summary();

    constructor(title: string = 'Test album',
                author: User = GetAuthor(),
                description?: string | undefined,
                startDate?: Date | undefined,
                endDate?: Date | undefined) {
        this.title = title;
        this.description = description ?? 'At amet est nostrud at est erat nostrud magna et lorem et in kasd. Sit eos amet aliquam no. Magna voluptua sed possim eros mazim labore rebum accusam ipsum sed ipsum. Lorem nihil ut justo sed consequat dolor dolores ut amet dolor feugiat sit. Rebum duo molestie elitr ut et. Facilisis feugait rebum justo dolores. Amet ea no ea voluptua vulputate sed facilisi sadipscing labore clita eos sit duo vero facilisi. Consetetur vero illum nulla. Rebum tempor clita et sadipscing te no tempor dolor ex. Ut magna consequat veniam sit accusam at lorem et accusam ea iusto.';
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
        this.finished = true;
        this.startDate = startDate;
        this.endDate = endDate;
        this.author=author;
    }

    private composeSummary(entries: JournalEntry[] | undefined): Summary {
        const summary = new Summary();

        summary.imagesCount = entries?.filter(e => e.kind === EntryKind.Image).length ?? 0;
        summary.videosCount = entries?.filter(e => e.kind === EntryKind.Video).length ?? 0;
        if (this.startDate !== undefined && this.endDate !== undefined) {
            const diffInTime: number = this.startDate.getTime() - this.endDate.getTime();
            summary.days = diffInTime / (1000 * 3600 * 24);
        }
        summary.distanceKM = 666;
        return summary;
    }
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
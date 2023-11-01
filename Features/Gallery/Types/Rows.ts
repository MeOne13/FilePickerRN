import {
    AchievementEntry,
    AudioEntry,
    EntryKind,
    Grouped,
    LocalityEntry,
    MapEntry,
    NoteEntry,
    Orientation,
    POIEntry,
    VideoEntry
} from "./Items";

export abstract class JournalRow {
    protected constructor(rowHeight: number = 300, kind: RowKind = RowKind.Two) {
        this.rowHeight = rowHeight;
        this.kind = kind;
    }

    readonly rowHeight: number;
    readonly kind: RowKind;
}

// export class AchievementRow extends Row {
//     constructor(achievements: AchievementEntry[], media: ImageEntry) {
//         super();
//         this.achievements = achievements;
//         this.media = media;
//     }
//
//     achievements: AchievementEntry[];
//     media: ImageEntry;
// }

export class LocalityRow extends JournalRow {
    locality: LocalityEntry;

    constructor(locality: LocalityEntry) {
        super(70, RowKind.Locality);
        this.locality = locality;
    }
}

export class NoteRow extends JournalRow {
    note: NoteEntry;

    constructor(note: NoteEntry) {
        super(note.text.length > 300 ? 300 : 200, RowKind.Note);
        this.note = note;
    }
}

export class AudioRow extends JournalRow {
    audio: AudioEntry;

    constructor(audio: AudioEntry) {
        super(170, RowKind.Audio);
        this.audio = audio;
    }
}

export class OneRow extends JournalRow {
    constructor(entries: Grouped[]) {
        if (entries.length < 1)
            throw new Error('Not enough entries in medias array');

        super(entries[0].orientation === Orientation.Portrait ? 500 : 400, RowKind.One);
        this.entry = entries[0];
    }

    entry: Grouped;
}

export class TwoRow extends JournalRow {
    constructor(items: Grouped[]) {
        if (items.length < 2)
            throw new Error('Not enough entries in medias array');
        const entries = items.slice(0, 2);
        const landscapeCount = entries.filter(e => e.orientation === Orientation.Landscape).length;
        const videosCount = entries.filter(e => e instanceof VideoEntry).length;
        const poisCount = entries.filter(e => e instanceof POIEntry || e instanceof AchievementEntry).length;
        let rowHeight = 50;

        switch (videosCount) {
            case 2:
                switch (landscapeCount) {
                    case 0:
                        rowHeight = 400;
                        break;
                    case 1:
                        rowHeight = 300;
                        break;
                    case 2:
                        rowHeight = 200;
                        break;
                }
                break;
            case 1:
                switch (landscapeCount) {
                    case 2:
                        rowHeight = 200;
                        break;
                    case 1:
                        rowHeight = 300;
                        break;
                    case 0:
                        rowHeight = 400;
                        break;
                }
                break;
            case 0:
                switch (landscapeCount) {
                    case 0:
                        rowHeight = 300;
                        break;
                    case 1:
                        rowHeight = 250;
                        break;
                    case 2:
                        rowHeight = 200;
                        break;
                }
                break;
        }
        super(rowHeight, RowKind.Two);
        this.entries = entries.slice(0, 2);
    }

    entries: Grouped[];
}

export class ThreeRow extends JournalRow {
    constructor(entries: Grouped[]) {
        if (entries.length < 3)
            throw new Error('Not enough items in medias array');
        let height = 0;
        const portraitOrientationCount = entries.filter(e => e.orientation === Orientation.Landscape).length;
        switch (portraitOrientationCount) {
            case 0:
                height = 200;
                break;
            case 1:
            case 2:
                height = 250;
                break;
            case 3:
                height = 250;
                break;
        }
        super(height, RowKind.Three);
        this.entries = entries.slice(0, 3);
    }

    entries: Grouped[];
}

export class OneTwoRow extends JournalRow {
    constructor(entries: Grouped[]) {
        if (entries.length < 3)
            throw new Error('Not enough items in medias array');
        let rowHeight = 400;
        // let rowHeight = entries[0].kind === EntryKind.Video ? 400 : 300;
        super(rowHeight, RowKind.OneTwo);
        this.entries = entries;
    }

    entries: Grouped[];
}

export class TwoOneRow extends JournalRow {
    constructor(entries: Grouped[]) {
        if (entries.length < 3)
            throw new Error('Not enough items in medias array');
        let rowHeight = 400;
        // let rowHeight = entries[2].kind === EntryKind.Video ? 400 : 300;
        super(rowHeight, RowKind.TwoOne);
        this.entries = entries;
    }

    entries: Grouped[];
}

export class MapRow extends JournalRow {
    map: MapEntry;

    constructor(map: MapEntry) {
        super(400, RowKind.Map);
        this.map = map;
    }
}

export enum RowKind {
    One,
    Two,
    Three,
    OneTwo,
    TwoOne,
    Audio,
    Map,
    Locality,
    Note,
    // Achievement,
}
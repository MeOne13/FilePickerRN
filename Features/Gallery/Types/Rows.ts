import {AudioEntry, EntryKind, Grouped, LocalityEntry, MapEntry, NoteEntry, Orientation} from "./Items";

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
        super(100, RowKind.Locality);
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
        super(100, RowKind.Audio);
        this.audio = audio;
    }
}

export class OneRow extends JournalRow {
    constructor(entries: Grouped[]) {
        if (entries.length < 1)
            throw new Error('Not enough entries in medias array');

        super(entries[0].orientation === Orientation.Portrait ? 400 : 300, RowKind.One);
        this.entry = entries[0];
    }

    entry: Grouped;
}

export class TwoRow extends JournalRow {
    constructor(entries: Grouped[]) {
        if (entries.length < 2)
            throw new Error('Not enough entries in medias array');
        const portraitCount = entries.filter(e =>
            e.kind === EntryKind.POI
            || e.kind === EntryKind.Achievement
            || ((e.kind === EntryKind.Image || e.kind === EntryKind.Video) && (e as Grouped).orientation === Orientation.Portrait))
            .length;
        let rowHeight = 0;
        switch (portraitCount) {
            case 2:
                rowHeight = 300;
                break;
            case 1:
                rowHeight = 200;
                break;
            default:
                rowHeight = 150;
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
        const portraitOrientationCount =entries.filter(e=>e.orientation === Orientation.Landscape).length;
        switch (portraitOrientationCount){
            case 0:
                height=200;
                break;
            case 1:
            case 2:
                height=250;
                break;
            case 3:
                height=300;
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
        let rowHeight = 300;
        if (entries[0].kind === EntryKind.Video || entries[0].orientation === Orientation.Portrait) {
            rowHeight = 400;
        }
        super(rowHeight, RowKind.OneTwo);
        this.big = entries[0];
        this.topSmall = entries[1];
        this.bottomSmall = entries[2];
    }

    big: Grouped;
    topSmall: Grouped;
    bottomSmall: Grouped;
}

export class TwoOneRow extends JournalRow {
    constructor(entries: Grouped[]) {
        if (entries.length < 3)
            throw new Error('Not enough items in medias array');
        let rowHeight = 300;
        if (entries[2].kind === EntryKind.Video || entries[2].orientation === Orientation.Portrait) {
            rowHeight = 400;
        }
        super(rowHeight, RowKind.TwoOne);
        this.big = entries[2];
        this.topSmall = entries[1];
        this.bottomSmall = entries[0];
    }

    big: Grouped;
    topSmall: Grouped;
    bottomSmall: Grouped;
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
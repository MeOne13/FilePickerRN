import {
    AudioEntry,
    EntryKind,
    Grouped,
    JournalEntry,
    LocalityEntry,
    MapEntry,
    NoteEntry,
} from "../Types/Items";
import {AudioRow, JournalRow, LocalityRow, MapRow, NoteRow, OneRow, ThreeRow, TwoRow} from "../Types/Rows";

export function ComposeFromGround(entries: JournalEntry[]): JournalRow[] {
    console.log('In compositor');
    const rows: JournalRow[] = [];
    if (entries.length === 0) {
        return rows;
    }
    const tmp_rows: JournalRow[] = [...rows];
    for (let i = 0; i < entries.length; i++) {
        let row: JournalRow | null = null;
        switch (entries[i].kind) {
            case EntryKind.Image:
            case EntryKind.Video:
            case EntryKind.POI:
                const tmpEntries: Grouped[] = [];
                for (let j = i; j < 3 && j < entries.length; j++) {
                    if (!(entries[j] instanceof Grouped))
                        break;
                    tmpEntries.push(entries[j] as Grouped);
                }
                switch (tmpEntries.length) {
                    case 1:
                        row = new OneRow([tmpEntries[0]]);
                        break;
                    case 2:
                        row = new TwoRow(tmpEntries);
                        i += 1;
                        break;
                    case 3:
                        row = new ThreeRow(tmpEntries);
                        i += 2;
                        break;
                }
                break;
            case EntryKind.Map:
                row = new MapRow(entries[i] as MapEntry);
                break;
            case EntryKind.Locality:
                row = new LocalityRow(entries[i] as LocalityEntry);
                break;
            case EntryKind.Note:
                row = new NoteRow(entries[i] as NoteEntry);
                break;
            case EntryKind.Audio:
                row = new AudioRow(entries[i] as AudioEntry);
                break;
        }
        console.log('Generated row - ');
        console.log(row);
    }
    return rows;
}
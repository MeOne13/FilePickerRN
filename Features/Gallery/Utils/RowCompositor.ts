import {
    AchievementEntry,
    AudioEntry,
    EntryKind,
    Grouped,
    JournalEntry,
    LocalityEntry,
    MapEntry,
    NoteEntry,
    POIEntry, VideoEntry,
} from "../Types/Items";
import {AudioRow, JournalRow, LocalityRow, MapRow, NoteRow, OneRow, RowKind, ThreeRow, TwoRow} from "../Types/Rows";

export function ComposeFromGround(entries: JournalEntry[]): JournalRow[] {
    const rows: JournalRow[] = [];

    for (let i = 0; i < entries.length; i++) {
        let row: JournalRow | null = null;
        switch (entries[i].kind) {
            case EntryKind.Image:
            case EntryKind.Video:
            case EntryKind.POI:
                const tmpEntries: Grouped[] = [];
                for (let j = 0; j < 3 && i + j < entries.length; j++) {
                    if (!(entries[i + j] instanceof Grouped))
                        break;
                    tmpEntries.push(entries[i + j] as Grouped);
                }
                let delta = 0;
                [row, delta] = composeMediaRow(tmpEntries);
                i += delta;
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
        rows.push(row as JournalRow);
        // console.log('Generated row - ');
        // console.log(row);
    }
    return rows;
}

//One row if there is only media
//Maybe two rows if their more than one POI/Achievement


const rowsDistances: [RowKind, number] = [RowKind.One, 0];
rowsDistances.push(RowKind.Two, 0);
rowsDistances.push(RowKind.Three, 0);
rowsDistances.push(RowKind.OneTwo, 0);
rowsDistances.push(RowKind.TwoOne, 0);

/**
 *
 * @param entries - medias or POIs or Achievements to compose row (can be 3 or 2 or 1)
 * @return JournalRow - composed row but amount of medias in row can vary
 * @constructor
 */
function composeMediaRow(entries: Grouped[]): [JournalRow, number] {
    let journalRow: JournalRow;
    let delta = 0;
    switch (entries.length) {
        case 1:
            journalRow = new OneRow(entries);
            rowsDistances[RowKind.One] = 0;
            break;
        case 2:
            journalRow = new TwoRow(entries);
            rowsDistances[RowKind.Two] = 0;
            delta++;
            break;
        //3 and more
        default:
            let deltaFromThree = 0;
            [journalRow, deltaFromThree] = chooseRowForThreeMedias(entries);
            delta += deltaFromThree;
            break;
    }
    return [journalRow, delta];
}

function chooseRowForThreeMedias(entries: Grouped[]): [JournalRow, number] {
    const isPoisOrAchievements = entries.filter(e => e instanceof POIEntry || e instanceof AchievementEntry).length > 0;
    if (isPoisOrAchievements) {
        const row = new TwoRow(entries);
        return [row, 2];
    }
    const videosPosition = entries.map((e,index)=> i instanceof VideoEntry);
}
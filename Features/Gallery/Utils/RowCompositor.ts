import {
    AchievementEntry,
    AudioEntry,
    EntryKind,
    Grouped,
    JournalEntry,
    LocalityEntry,
    MapEntry,
    NoteEntry,
    Orientation,
    POIEntry,
    VideoEntry,
} from "../Types/Items";
import {
    AudioRow,
    JournalRow,
    LocalityRow,
    MapRow,
    NoteRow,
    OneRow,
    OneTwoRow,
    RowKind,
    ThreeRow,
    TwoOneRow,
    TwoRow
} from "../Types/Rows";

const d: number[] = [0, 0, 0, 0, 0];
// for (let i = 0; i < 5; i++) {
//     d.push(0);
// }
//
// const distances: [RowKind, number][] = [];
// distances.push([RowKind.One, 0]);
// distances.push([RowKind.Two, 0]);
// distances.push([RowKind.Three, 0]);
// distances.push([RowKind.OneTwo, 0]);
// distances.push([RowKind.TwoOne, 0]);

export function ComposeFromGround(entries: JournalEntry[]): JournalRow[] {
    const rows: JournalRow[] = [];
    console.log('In compositor');

    for (let i = 0; i < entries.length;) {
        let row: JournalRow | null = null;
        switch (entries[i].kind) {
            case EntryKind.Image:
            case EntryKind.Video:
            case EntryKind.POI:
                const tmpEntries: Grouped[] = [];
                for (let j = 0; (j < 3) && (i + j < entries.length); j++) {
                    if (entries[i + j] instanceof Grouped)
                        tmpEntries.push(entries[i + j] as Grouped);
                    else
                        break;
                }
                let delta = 0;
                [row, delta] = composeMediaRow(tmpEntries);
                i += delta;
                calculateRowDistances(row as JournalRow);
                break;
            case EntryKind.Map:
                row = new MapRow(entries[i] as MapEntry);
                i++;
                break;
            case EntryKind.Locality:
                row = new LocalityRow(entries[i] as LocalityEntry);
                i++;
                break;
            case EntryKind.Note:
                row = new NoteRow(entries[i] as NoteEntry);
                i++;
                break;
            case EntryKind.Audio:
                row = new AudioRow(entries[i] as AudioEntry);
                i++;
                break;
        }
        rows.push(row as JournalRow);
    }
    return rows;
}

function calculateRowDistances(row: JournalRow) {
    for (let i = 0; i < d.length; i++) {
        if (i != row.kind) {
            d[i] += 1;
            console.log('Increment ' + d[i]);
            console.log(d[i]);
        } else {
            d[i] = 0;
        }
    }
}

/**
 *
 * @param entries - medias or POIs or Achievements to compose row (can be 3 or 2 or 1)
 * @return JournalRow - composed row but amount of medias in row can vary
 * @constructor
 */
function composeMediaRow(entries: Grouped[]): [JournalRow, number] {
    let journalRow: JournalRow;
    let delta = 1;
    switch (entries.length) {
        case 1:
            journalRow = new OneRow(entries);
            break;
        case 2:
            journalRow = new TwoRow(entries);
            delta = 2;
            break;
        //3 and more
        default:
            let deltaFromThree = 0;
            [journalRow, deltaFromThree] = chooseRowForThreeMedias(entries);
            delta = deltaFromThree;
            break;
    }
    return [journalRow, delta];
}

function chooseRowForThreeMedias(entries: Grouped[]): [JournalRow, number] {
    const poisAchievementsPositions = entries.map(e => e instanceof POIEntry || e instanceof AchievementEntry);
    const videosPosition = entries.map((e) => e instanceof VideoEntry);
    const isLandscape = entries.filter((e) => e.orientation === Orientation.Landscape).length > 0;

    if (poisAchievementsPositions.some(e => e)) {
        if (poisAchievementsPositions[2]) {
            const row = new TwoRow(entries);
            return [row, 2];
        } else if (!poisAchievementsPositions[0]
            && poisAchievementsPositions[1] && poisAchievementsPositions[2]) {
            const row = new OneRow(entries);
            return [row, 1];
        } else {
            const row = new TwoRow(entries);
            return [row, 2];
        }
    }

    if (videosPosition.some(e => e)) {
        if (videosPosition[0] && entries[0].orientation === Orientation.Portrait
            && !videosPosition[1] && !videosPosition[2]) {
            const row = new OneTwoRow(entries);
            return [row, 3];
        } else if (!videosPosition[0] && !videosPosition[1]
            && videosPosition[2] && entries[2].orientation === Orientation.Portrait) {
            const row = new TwoOneRow(entries);
            return [row, 3];
        }
    }

    const rowToCreate: RowKind = getMostSuitable();
    switch (rowToCreate) {
        case RowKind.One:
            const oneRow = new OneRow(entries);
            return [oneRow, 1];
        case RowKind.Two:
            const twoRow = new TwoRow(entries);
            return [twoRow, 2];
        case RowKind.Three:
            const threeRow = new ThreeRow(entries);
            return [threeRow, 3];
        case RowKind.OneTwo:
            const oneTwoRow = new OneTwoRow(entries);
            return [oneTwoRow, 3];
        case RowKind.TwoOne:
            const twoOneRow = new TwoOneRow(entries);
            return [twoOneRow, 3];
        default:
            throw new Error('Wrong type of a row');
    }

    function getMostSuitable(): RowKind {
        if (isLandscape) {
            const one = d[RowKind.One];
            const two = d[RowKind.Two];
            return one > two ? RowKind.One : RowKind.Two;
        } else {
            if (d[RowKind.Three] > 2) {
                return RowKind.Three;
            }
            let maxPos = 0;
            let max = 0;
            let prevMaxPos = 0;
            let prevMax = 0;
            for (let i = 0; i < d.length; i++) {
                if (d[i] >= prevMax) {
                    prevMax = max;
                    prevMaxPos = maxPos;
                    maxPos = i;
                    max = d[i];
                }
            }
            if (maxPos == RowKind.Three && isLandscape) {
                return prevMaxPos;
            } else {
                return maxPos;
            }
        }
    }
}
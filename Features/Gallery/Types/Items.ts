//#region Items
import {JournalRow} from "./Rows";
import uuid from "react-native-uuid";
import {GetAuthor, User} from "../Utils/Generators/TestUsers";

export abstract class JournalEntry implements Reacted, Commented {
    protected constructor(guid: string | undefined, dateTaken: Date | number, dateOrder: Date | number) {
        if (guid === undefined) {
            guid = uuid.v4().toString();
        }
        if (!(dateTaken instanceof Date)) {
            const utcSeconds = dateTaken;
            dateTaken = new Date(0);
            dateTaken.setUTCSeconds(utcSeconds);
        }
        if (!(dateOrder instanceof Date)) {
            const utcSeconds = dateOrder;
            dateOrder = new Date(0);
            dateOrder.setUTCSeconds(utcSeconds);
        }
        this.guid = guid;
        this.dateOrder = dateOrder;
        this.dateTaken = dateTaken;
    }

    get IsToGroup(): boolean {
        return this.kind === EntryKind.Audio || this.kind === EntryKind.Image || this.kind === EntryKind.POI;
    }

    author: User = GetAuthor();
    guid: string;
    dateTaken: Date;
    dateOrder: Date;
    comments: Comment[] | undefined = undefined;
    reactions: Reaction[] | undefined = undefined;
    kind: EntryKind = EntryKind.Image;
}


export interface Commented {
    comments: Comment[] | undefined;
}

export interface Reacted {
    reactions: Reaction[] | undefined;
}

export abstract class Grouped extends JournalEntry {
    orientation: Orientation;

    protected constructor(orientation: Orientation, guid: string | undefined, dateTaken: Date | number, dateOrder: Date | number) {
        super(guid, dateTaken, dateOrder);
        this.orientation = orientation;
    }
}

export class ImageEntry extends Grouped {
    fullQualityPath: string;
    compressedPath: string;

    constructor(fullQualitySourcePath: string, compressedSourcePath: string,
                orientation: Orientation = Orientation.Portrait,
                guid: string | undefined,
                dateTaken: Date | number,
                dateOrder: Date | number) {
        super(orientation,guid, dateTaken, dateOrder);
        this.fullQualityPath = fullQualitySourcePath;
        this.compressedPath = compressedSourcePath;
        this.kind = EntryKind.Image;
    }
}

export class VideoEntry extends Grouped {
    fullQualitySourcePath: string;
    compressedSourcePath: string | undefined;
    thumbnailPath: string;

    constructor(fullQualitySourcePath: string,
                compressedSourcePath: string | undefined,
                thumbnailPath: string,
                orientation: Orientation = Orientation.Portrait,
                guid: string | undefined,
                dateTaken: Date | number,
                dateOrder: Date | number) {
        super(orientation,guid, dateTaken, dateOrder);
        this.fullQualitySourcePath = fullQualitySourcePath;
        this.compressedSourcePath = compressedSourcePath;
        this.thumbnailPath = thumbnailPath;
        this.kind = EntryKind.Video;
    }
}

export class POIEntry extends Grouped {
    title: string;

    constructor(title: string, guid: string | undefined, dateTaken: Date | number, dateOrder: Date | number) {
        super(Orientation.Portrait,guid, dateTaken, dateOrder);
        this.title = title;
        this.kind = EntryKind.POI;
    }
}

export class AudioEntry extends JournalEntry {
    trackPath: string;

    constructor(trackPath: string | undefined, guid: string | undefined, dateTaken: Date | number, dateOrder: Date | number) {
        super(guid, dateTaken, dateOrder);
        this.trackPath = trackPath ?? 'assets/audios/sample-15s.mp3';
        this.kind = EntryKind.Audio;
    }
}

export class AchievementEntry extends Grouped {
    title: string;

    constructor(title: string, guid: string | undefined, dateTaken: Date | number, dateOrder: Date | number) {
        super(Orientation.Portrait,guid, dateTaken, dateOrder);
        this.title = title;
        this.kind = EntryKind.Achievement;
    }
}

export class NoteEntry extends JournalEntry {
    text: string

    constructor(text: string | undefined, guid: string | undefined, dateTaken: Date | number, dateOrder: Date | number) {
        super(guid, dateTaken, dateOrder);
        this.text = text ?? 'Et eirmod clita sed facilisi aliquam nobis sed erat. Dolore sit accusam et consequat lorem sit delenit sanctus commodo dolore eirmod suscipit diam. Iriure sadipscing consetetur justo.' +
            'Et eirmod clita sed facilisi aliquam nobis sed erat. Dolore sit accusam et consequat lorem sit delenit sanctus commodo dolore eirmod suscipit diam. Iriure sadipscing consetetur justo.' +
            't eirmod clita sed facilisi aliquam nobis sed erat. Dolore sit accusam et consequat lorem sit delenit sanctus commodo dolore eirmod suscipit diam. Iriure sadipscing consetetur justo.' +
            't eirmod clita sed facilisi aliquam nobis sed erat. Dolore sit accusam et consequat lorem sit delenit sanctus commodo dolore eirmod suscipit diam. Iriure sadipscing consetetur justo.';
        this.kind = EntryKind.Note;
    }
}

export class LocalityEntry extends JournalEntry {
    title: string;
    transport: TransportType;

    constructor(title: string, transport: TransportType = TransportType.Vehicle, guid: string | undefined, dateTaken: Date | number, dateOrder: Date | number) {
        super(guid, dateTaken, dateOrder);
        this.title = title;
        this.transport = transport;
        this.kind = EntryKind.Locality;
    }
}

export class MapEntry extends JournalEntry {
    distance: number = 0;
    averageSpeed: number = 0;
    timeInMotionMinutes: number = 0;
    points: TrackPoint[] = [];

    constructor(points: TrackPoint[], guid: string | undefined, dateTaken: Date | number, dateOrder: Date | number) {
        super(guid, dateTaken, dateOrder);
        this.points = points;
        this.kind = EntryKind.Map;
        //Calculate stats
    }
}


//#endregion Items

export type JournalEntriesArray = JournalEntry[];

export enum TransportType {
    Vehicle,
    Bike,
    PersonalMobility
}

export enum Orientation {
    Portrait,
    Landscape
}

export enum Direction {
    rtl,
    ltr
}

export enum EntryKind {
    Image,
    Video,
    Note,
    Audio,
    Achievement,
    POI,
    Map,
    Locality,
}

export class Comment {
    author: User | undefined = undefined;
    content: string = '';
}

export class Reaction {
    author: User | undefined = undefined;
    reaction: ReactionType = ReactionType.Like;
}

export class TrackPoint {
    lat: number = 0;
    lon: number = 0;
    altitude: number = 0;
}

export enum ReactionType {
    Like,
    Applause,
    Cool,
    ThumbUp,
    LOL,
    Sad,
    Crying
}